import { auth } from "@/auth";

export default async function getUserRole() {
  return (await auth())?.user?.role;
}
