import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
} from "./routes";
import next from "next";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const nextUrl = req.nextUrl;
  const path = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  const isAuthPrefixRoute = path.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);

  if (isAuthPrefixRoute || isPublic) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isPublic && !isLoggedIn) {
    let callbackURL = nextUrl.pathname;

    if (nextUrl.search) {
      callbackURL += `?${nextUrl.search}`;
    }

    return Response.redirect(
      new URL(
        `/auth/login?callbackURL=${encodeURIComponent(callbackURL)}`,
        nextUrl
      )
    );
  }

  return;
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
