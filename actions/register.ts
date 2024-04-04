"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/schemas";
import { RegisterFormType } from "@/types";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterFormType) => {
  const parsed = RegisterSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid Credentials",
    };
  }

  const { password, email, name } = values;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in Use" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const registerToken = await generateVerificationToken(email);

  if (!registerToken) {
    Response.redirect("/auth/login");
    return;
  }

  await sendVerificationEmail(email, registerToken.token);

  return { success: "Email Verification Sent!" };
};
