"use server"
import { IncomingMessage } from "http";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getَQuestions( { params }: { params: { id: string }} ) {
      const id = params.id;
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

  if (!token) {
    throw new Error("Failed Token");
  }

  const response = await fetch(`${process.env.GET_QUSETIONS_API_URL}?exam=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: String(token?.accessToken),
    },
  });
console.log("sss",response)
  return response.json();
}
