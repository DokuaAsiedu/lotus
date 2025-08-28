import { BASE_URL } from "@/config"
import { destroySession, getToken } from "@/lib/session"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const token = await getToken()

    if (!token) {
      destroySession()
      redirect("/login")
    }

    const gameId = req.nextUrl.searchParams.get("gameId")
    const startDate = req.nextUrl.searchParams.get("startDate")
    const endDate = req.nextUrl.searchParams.get("endDate")

    const url = `${BASE_URL}/draw/winnings?gameId[]=${gameId}&from=${startDate}&to=${endDate}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status == 401) {
      destroySession()
      redirect("/login")
    }

    if (!response.ok) {
      throw new Error("Error getting games")
    }

    const res = await response.json()

    if (!res.status) {
      throw new Error(res.message)
    }

    return Response.json(res)
  } catch (err) {
    const response = {
      status: false,
      message: "Error getting winnings",
      data: null,
    }

    return Response.json(response)
  }
}
