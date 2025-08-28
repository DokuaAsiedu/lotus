import { BASE_URL } from "@/config"
import { createSession, destroySession } from "@/lib/session"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const body = JSON.stringify({ email, password })

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body,
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const res = await response.json()

    if (!res.status) {
      throw new Error(res.status)
    }

    await createSession(res.data)

    return Response.json({ success: true })
  } catch (err) {
    destroySession()

    const response = {
      status: false,
      message: "Error logging in",
      data: null,
    }

    return Response.json(response)
  }
}
