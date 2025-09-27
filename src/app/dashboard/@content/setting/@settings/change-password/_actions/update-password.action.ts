"use server";
import { IncomingMessage } from "http";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function updatePasswordAction(
  data: Record<string, FormDataEntryValue>
) {
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
  // Send update password
  const response = await fetch(`${process.env.UPDATE_PASSWORD_API_URL}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token: String(token?.accessToken),
    },
  });
  const payload = await response.json();
  return payload;
}
