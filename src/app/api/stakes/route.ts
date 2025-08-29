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

    const gameIds = req.nextUrl.searchParams.getAll("gameId[]").map((item) => `gameId[]=${item}`).join("&")
    const startDate = req.nextUrl.searchParams.get("startDate")
    const endDate = req.nextUrl.searchParams.get("endDate")

    const url = `${BASE_URL}/stakes?from=${startDate}&to=${endDate}&${gameIds}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status == 401) {
      destroySession()
      redirect("/")
    }

    if (!response.ok) {
      throw new Error("Error getting stakes")
    }

    const res = await response.json()

    if (!res.status) {
      throw new Error(res.message)
    }

    return Response.json(res)
  } catch (err) {
    const response = {
      status: false,
      message: "Error getting stakes",
      data: null,
    }

    return Response.json(response)
  }
}
