import { createSession, destroySession } from "./session"
import { BASE_URL } from "@/config"

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString() || ""
  const password = formData.get("password")?.toString() || ""

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  const body = JSON.stringify({ email, password })

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers,
    body,
  })

  if (!response.ok) {
    destroySession()
    throw new Error("Login failed")
  }

  const res = await response.json()

  if (!res.status) {
    destroySession()
    throw new Error(res.message)
  }

  createSession(res.data)
}
