import { auth } from "@/auth";

const getCurrentUser = async () => (await auth())?.user;
export default getCurrentUser;
