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

    let url = `${BASE_URL}/games`

    const searchParamsArray = <string[]>[]

    req.nextUrl.searchParams.forEach((value, key) => {
      searchParamsArray.push(`${key}=${value}`)
    })
    const searchParams = searchParamsArray.join("&")

    if (searchParams) {
      url += "?" + searchParams
    }

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
      message: "Error getting games",
      data: null,
    }

    return Response.json(response)
  }
}
