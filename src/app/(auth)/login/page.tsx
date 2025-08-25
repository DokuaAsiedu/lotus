"use client"

import { login } from "@/lib/apis";
import { Spinner } from "@/components";
import Image from "next/image";
import { useState } from "react";
import { errorAlert, successAlert } from "@/lib/alerts";
import { useRouter } from "next/navigation";

export default function Login() {
  const [pending, setPending] = useState(false);
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      await login(formData);
      successAlert('Login successful')
      router.push('/sales')
    } catch (err) {
      console.log(err)
      errorAlert(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <Image src="/icon.png" alt="app icon" width={100} height={2} />
      </div>
      <div className="py-12 px-16 flex flex-col items-stretch justify-center gap-3 border-1 border-black rounded-md">
        <button type="button" className="px-4 py-2 border-black border-1 flex gap-4 cursor-pointer">
          <div className="aspect-square flex items-center">
            <Image src="/icons/google.png" alt="app icon" width={10} height={10} className="aspect-square" />
          </div>
          <p>Sign-in with google</p>
        </button>
        <p className="text-center">Or</p>
        <form className="flex flex-col items-stretch gap-5" onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          await handleSubmit(formData)
        }}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div className="px-4 py-2 flex items-center gap-4 border-1 border-black">
              <div className="h-full flex items-center aspect-square">
                <Image src="/icons/mail.png" alt="email icon" width={12} height={12} />
              </div>
              <input id="email" name="email" className="border-0! focus:outline-0" placeholder="Enter your email"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="px-4 py-2 flex items-center gap-4 border-1 border-black">
              <div className="h-full flex items-center aspect-square">
                <Image src="/icons/lock.png" alt="email icon" width={12} height={12} />
              </div>
              <input id="password" name="password" className="border-0! focus:outline-0" placeholder="Enter password" type="password" />
            </div>
          </div>
          <button type="submit" className="py-3 flex items-center justify-center bg-black text-white cursor-pointer" disabled={pending}>
            {pending ? <Spinner text="Signing in..." /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
