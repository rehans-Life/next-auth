import getUserRole from "@/lib/get-user-role";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await getUserRole();

  return new NextResponse(null, {
    status: role === UserRole.ADMIN ? 200 : 403,
  });
}
