"use client"

import { toast } from "react-toastify"

export function successAlert(message: string) {
  toast.success(message)
}

export function errorAlert(message: string) {
  toast.error(message)
}

export function infoAlert(message: string) {
  toast.info(message)
}

export function warningAlert(message: string) {
  toast.warn(message)
}
