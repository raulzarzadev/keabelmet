import { refreshInstagramToken } from "@/lib/instagram"
import { NextResponse } from "next/server"

export async function GET() {
  const newToken = await refreshInstagramToken()

  if (!newToken) {
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
  }

  console.log("New Instagram token (update INSTAGRAM_ACCESS_TOKEN):", newToken)

  return NextResponse.json({
    success: true,
    message: "Token refreshed. Update INSTAGRAM_ACCESS_TOKEN env var with the new token.",
    token: newToken,
  })
}
