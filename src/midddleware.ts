import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = [
  "/login",
  "/forget",
  "/register",
  "/verify",
  "/createnewpassword",
];
const publicRoutes = ["/", ...authRoutes];
export default async function midddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request });

  if (!publicRoutes.includes(pathname)) {
    if (token) return NextResponse.next();

    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (authRoutes.includes(pathname)) {
    if (!token) return NextResponse.next();

    const redirectUrl = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
