import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
  SettingsSchema,
} from "@/schemas";
import z from "zod";

export type NewPasswordFormType = z.infer<typeof NewPasswordSchema>;
export type ResetFormType = z.infer<typeof ResetSchema>;
export type LoginFormType = z.infer<typeof LoginSchema>;
export type RegisterFormType = z.infer<typeof RegisterSchema>;
export type SettingsFormType = z.infer<typeof SettingsSchema>;
