import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token.";
import { randomInt } from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = randomInt(100_000, 10_00_000).toString();

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await db.twoFactorToken
        .delete({
          where: { id: existingToken.id },
        })
        .catch(() => null);
    }

    return db.twoFactorToken.create({
      data: { email, token, expires: new Date(Date.now() + 3600 * 1000) },
    });
  } catch {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = uuid();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await db.passwordResetToken
        .delete({
          where: {
            id: existingToken.id,
          },
        })
        .catch(() => null);
    }

    const resetToken = await db.passwordResetToken.create({
      data: {
        token,
        email,
        expires,
      },
    });

    return resetToken;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuid();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken
        .delete({
          where: {
            id: existingToken.id,
          },
        })
        .catch(() => null);
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        token,
        email,
        expires,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
