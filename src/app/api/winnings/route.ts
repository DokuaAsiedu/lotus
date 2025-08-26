import { BASE_URL } from "@/config"
import { getToken } from "@/lib/session"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const token = await getToken()

  if (!token) {
    redirect("/login")
  }

  const gameId = req.nextUrl.searchParams.get("gameId")
  const startDate = req.nextUrl.searchParams.get("startDate")
  const endDate = req.nextUrl.searchParams.get("endDate")

  const url = `${BASE_URL}/draw/winnings?gameId[]=${gameId}&from=${startDate}&to=${endDate}`

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  return Response.json(data)
}
