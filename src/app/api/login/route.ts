import { BASE_URL } from "@/config"
import { createSession, destroySession } from "@/lib/session"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  const body = JSON.stringify({ email, password })

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers,
    body,
  })

  if (!response.ok) {
    destroySession()
    return Response.json({ success: false, message: "Login failed" }, { status: 401 })
  }

  const res = await response.json()

  if (!res.status) {
    destroySession()
    return Response.json({ success: false, message: res.message }, { status: 400 })
  }

  await createSession(res.data)

  return Response.json({ success: true })
}
