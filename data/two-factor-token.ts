import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return db.twoFactorToken.findUnique({
      where: { token },
    });
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return db.twoFactorToken.findFirst({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};
