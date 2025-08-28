import { BASE_URL } from "@/config"
import { destroySession, getToken } from "@/lib/session"
import { redirect } from "next/navigation"

export async function GET() {
  try {
    const token = await getToken()

    if (!token) {
      destroySession()
      redirect("/login")
    }

    const url = `${BASE_URL}/reports/sales/retailers`

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
      throw new Error("Error getting sales")
    }

    const res = await response.json()

    if (res.status) {
      throw new Error(res.message)
    }

    return Response.json(res)
  } catch (err) {
    const response = {
      status: false,
      message: "Error getting sales",
      data: null,
    }

    return Response.json(response)
  }
}
