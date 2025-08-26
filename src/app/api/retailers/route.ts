import { BASE_URL } from "@/config"
import { getToken } from "@/lib/session"
import { redirect } from "next/navigation"

export async function GET() {
  const token = await getToken()

  if (!token) {
    redirect("/login")
  }

  const url = `${BASE_URL}/reports/sales/retailers`

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  return Response.json(data)
}
