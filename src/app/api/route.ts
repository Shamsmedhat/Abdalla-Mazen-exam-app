import { getAccessToken } from "@/lib/actions/get-token.action"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  try {
    const accessToken = await getAccessToken(req)

    // تقدر تستخدم التوكن هنا مع API خارجي
    return NextResponse.json({ message: "Success", accessToken })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
