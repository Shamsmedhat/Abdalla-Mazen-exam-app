"use server";
import { IncomingMessage } from "http";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ExamsResponse {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}

export default async function getExams(): Promise<ExamsResponse> {
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

  const response = await fetch(`${process.env.EXAMS_API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: String(token?.accessToken),
    },
  });

  return response.json();
}
