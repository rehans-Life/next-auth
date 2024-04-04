"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return {
      error: "Invalid Token",
    };
  }

  if (verificationToken.expires.getTime() < Date.now()) {
    return {
      error: "Token has expired",
    };
  }

  const user = await getUserByEmail(verificationToken.email);

  if (!user || !user.email) {
    return {
      error: "No User Found",
    };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: verificationToken.email,
      },
    });
  } catch {
    return {
      error: "Unable to verify user please try again later",
    };
  }

  // If this doesnt delete its fine cause email and token
  // both should be unique. this means we will be able to
  // create more verification tokens with the same email.
  await db.verificationToken
    .delete({
      where: { token, email: user.email },
    })
    .catch(() => null);

  return { success: "Email Verified 🎉" };
};
