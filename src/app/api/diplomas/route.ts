// src/app/api/diplomas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const url = new URL(process.env.DIPLOMA_API_URL!); 
  const page = req.nextUrl.searchParams.get("page") || "1";
  const limit = req.nextUrl.searchParams.get("limit") || "6";
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);

  const response = await fetch(url.toString(), {
    headers: { token: String(token.accessToken) },
  });

  if (!response.ok) return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });

  const data = await response.json();
  return NextResponse.json(data);
}
