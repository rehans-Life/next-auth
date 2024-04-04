import { UserRole } from "@prisma/client";
import z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    ({ newPassword, password }) => {
      if (password && !newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is Required",
      path: ["newPassword"],
    }
  );

export const NewPasswordSchema = z
  .object({
    password: z.string().min(1, {
      message: "Password is Required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is Required",
    }),
  })
  .refine(({ confirmPassword, password }) => {
    return confirmPassword === password;
  }, "Passwords do not match");

export const ResetSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});

export const LoginSchema = z
  .object({
    code: z.optional(z.string()),
    password: z.string().min(1, {
      message: "Password is Required",
    }),
  })
  .merge(ResetSchema);

export const RegisterSchema = z.object({
  name: z.string().min(3, "Username must have atleast 3 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(8, {
    message: "Your password must have atleast 8 characters",
  }),
});
