import { NextAuthConfig, User } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { db } from "./lib/db";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);

        if (parsed.success) {
          const { email, password } = parsed.data;

          const existingUser = await getUserByEmail(email);

          if (!existingUser || !existingUser.password) return null;

          if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation =
              await getTwoFactorConfirmationByUserId(existingUser.id);

            if (!twoFactorConfirmation) return null;

            await db.twoFactorConfirmation.delete({
              where: { id: twoFactorConfirmation.id },
            });
          }

          const passwordsMatch = await compare(password, existingUser.password);

          if (!passwordsMatch) return null;

          return existingUser as unknown as User;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
