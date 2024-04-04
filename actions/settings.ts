"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import getCurrentUser from "@/lib/get-current-user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";
import { SettingsFormType } from "@/types";
import { compare, hash } from "bcryptjs";

const settings = async (settingsFormType: SettingsFormType) => {
  const user = await getCurrentUser();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id || "");

  if (!dbUser) return { error: "User not found" };

  const parsedData = SettingsSchema.safeParse(settingsFormType);

  if (!parsedData.success) return { error: "Invalid Credentials" };

  const { data: values } = parsedData;

  if (user.isOAuth) {
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
    values.email = undefined;
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);

    if (!!existingUser) return { error: "Email already in use" };

    const verificationToken = await generateVerificationToken(values.email);

    if (!verificationToken)
      return { error: "An error occured while updating the settings" };

    try {
      await sendVerificationEmail(values.email, verificationToken.token);
    } catch {
      return {
        error:
          "Unable to send verification link for new email please try again",
      };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const correctPassword = await compare(values.password, dbUser.password);

    if (!correctPassword) return { error: "Incorrect Password" };

    values.password = await hash(values.newPassword, 12);
    values.newPassword = undefined;
  }

  try {
    await db.user.update({
      where: { id: dbUser.id },
      data: { ...values },
    });

    return { success: "Settings Updated!" };
  } catch (error) {
    console.log(error);

    return { error: "An error occured while updating the settings" };
  }
};

export default settings;
