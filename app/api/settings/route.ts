
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
) {
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const {  ok } = body;

  return new NextResponse("OK", { status: 200 });

}
