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

    let url = `${BASE_URL}/wallet/history`

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
      redirect("/")
    }

    if (!response.ok) {
      throw new Error("Error getting wallets")
    }

    const res = await response.json()

    if (!res.status) {
      throw new Error(res.message)
    }

    return Response.json(res)
  } catch (err) {
    const response = {
      status: false,
      message: "Error getting wallets",
      data: null,
    }

    return Response.json(response)
  }
}
