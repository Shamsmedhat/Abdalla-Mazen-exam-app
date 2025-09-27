'use server'

import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function getAccessToken(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) throw new Error("Not authenticated")

  return token.accessToken as string
}
