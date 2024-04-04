"use server";

import getUserRole from "@/lib/get-user-role";
import { UserRole } from "@prisma/client";

const admin = async () => {
  const role = await getUserRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action" };
  }

  return { success: "Your allowed to access this server action" };
};

export default admin;
