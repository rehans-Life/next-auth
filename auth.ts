import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface User {
    role: "USER" | "ADMIN";
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id || "");

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    session({ token, session }) {
      session.user.isOAuth = token.isOAuth;
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      if (token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role;
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      const existingAccount = await getAccountByUserId(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount;

      return token;
    },
  },
});
