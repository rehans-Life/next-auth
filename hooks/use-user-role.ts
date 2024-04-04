import { useSession } from "next-auth/react";

const useUserRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};

export default useUserRole;
