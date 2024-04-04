"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { ResetFormType } from "@/types";

export const reset = async (resetForm: ResetFormType) => {
  const parsedData = ResetSchema.safeParse(resetForm);

  if (!parsedData.success) return { error: "Invalid Email" };

  const { email } = parsedData.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: "Email not found!" };

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken)
    return {
      error: "An Error Occured while creating the token please try again later",
    };

  try {
    await sendPasswordResetEmail(email, passwordResetToken.token);
  } catch {
    return {
      error:
        "Something went wrong while sending the email please try again later",
    };
  }

  return { success: "Reset email sent!" };
};
