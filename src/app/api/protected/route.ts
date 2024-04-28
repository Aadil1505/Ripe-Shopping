import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const user = await getUser();
  const data = { message: "Hello User", id: user?.given_name };
  
  if (!(await isAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  return NextResponse.json({ data });
}

