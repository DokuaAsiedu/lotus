"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import { SESSION_EXPIRY_HOURS, SESSION_KEY } from "../config"

type data = {
  userId: number
  entityId: never
  token: string
  expiresAt: string
}

const cookieProps: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  expires: getExpiryDate(),
  path: "/",
}

function getExpiryDate() {
  return new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000)
}

export async function createSession(data: data) {
  await storeSessionCookie(data)
}

async function storeSessionCookie(sessionData: data) {
  const stringifiedData = JSON.stringify(sessionData)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_KEY, stringifiedData, cookieProps)
}

export async function getCookie(key: string) {
  const cookieStore = await cookies()

  return cookieStore.get(key)?.value
}

export async function refreshSession() {
  const session = await getCookie(SESSION_KEY)

  if (!session) return null

  const data = JSON.parse(session);

  await storeSessionCookie(data)
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.delete(SESSION_KEY)
}

export async function getToken() {
  const session = await getCookie(SESSION_KEY);
  const sessionParsed =  session ? JSON.parse(session) : null
  const token = sessionParsed?.token || null
  return token
}
