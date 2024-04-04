"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token.";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { NewPasswordFormType } from "@/types";
import { hash } from "bcryptjs";

export const newPassword = async (
  token: string,
  newPasswordForm: NewPasswordFormType
) => {
  const parsedData = NewPasswordSchema.safeParse(newPasswordForm);

  if (!parsedData.success) return { error: "Invalid Passwords" };

  const resetToken = await getPasswordResetTokenByToken(token);

  if (!resetToken) return { error: "Invalid Token" };

  if (resetToken.expires.getTime() < Date.now()) {
    return { error: "Token Expired" };
  }

  const user = await getUserByEmail(resetToken.email);

  if (!user || !user.email) return { error: "User not found" };

  try {
    await db.user.update({
      where: { email: user.email },
      data: {
        password: await hash(parsedData.data.password, 12),
      },
    });
  } catch (error) {
    return { error: "Unable to update password please try again." };
  }

  await db.passwordResetToken
    .delete({
      where: { token, email: user.email },
    })
    .catch(() => null);

  return { success: "Password successfully reset" };
};
