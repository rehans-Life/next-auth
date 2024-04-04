import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return db.passwordResetToken.findFirst({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordRestToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordRestToken;
  } catch (error) {
    return null;
  }
};
