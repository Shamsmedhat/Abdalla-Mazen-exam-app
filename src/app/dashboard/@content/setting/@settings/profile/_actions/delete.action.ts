"use server";

import { IncomingMessage } from "http";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteUser() {
  // Get JWT token from cookies
  const token = await getToken({
    req: {
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      ),
    } as unknown as IncomingMessage & { cookies: Record<string, string> },
    secret: process.env.NEXTAUTH_SECRET,
  });
  // Api delete user
  const response = await fetch(`${process.env.DELETE_USER_API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: String(token?.accessToken),
    },
  });
  const payload = await response.json();

  return payload;
}
