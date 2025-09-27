"use server";

import { IncomingMessage } from "http";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function submitAnswer(data: Record<string, FormDataEntryValue>) {
  // Get token from JWT
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
  // Submit answer
  const response = await fetch(`${process.env.SUBMIT_QUSETIONS_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: String(token?.accessToken),
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json();

  return payload;
}
