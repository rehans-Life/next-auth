"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenByToken } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { send2FAVerificationEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { LoginFormType } from "@/types";
import { AuthError } from "next-auth";

export const login = async (
  values: LoginFormType,
  callbackURL: string | null
) => {
  const parsed = LoginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid Credentials",
    };
  }

  const { email, password, code } = parsed.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(existingUser.email);

    if (!token)
      return { error: "Unable to create verififcation token please try again" };

    try {
      await sendVerificationEmail(email, token.token);
    } catch {
      return { error: "Unable to send verififcation email please try again" };
    }

    return { success: "Confirmation email has been sent!" };
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByToken(code);

      if (!twoFactorToken || twoFactorToken?.email !== existingUser.email) {
        return { error: "Invalid code" };
      }

      if (twoFactorToken.expires.getTime() < Date.now()) {
        return { error: "Code has expired" };
      }

      try {
        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } catch (err) {
        console.log(err);
        return {
          error: "An error occured while verifying your code please try again",
        };
      }

      await db.twoFactorToken
        .delete({
          where: { token: code, email },
        })
        .catch(() => null);
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      if (!twoFactorToken)
        return { error: "Unable to create two factor token please try again" };

      try {
        await send2FAVerificationEmail(
          existingUser.email,
          twoFactorToken?.token
        );
      } catch {
        return { error: "Unable to send Two Factor code please try again" };
      }

      return { twoFactor: "success" };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackURL || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
