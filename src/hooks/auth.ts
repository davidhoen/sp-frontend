import { useRouter } from "@/i18n/routing"
import axios from "@/lib/axios"
import { AxiosResponse } from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"
import { useCallback } from "react"

export const useAuth = ({ middleware, redirectIfAuthenticated }: { middleware?: string; redirectIfAuthenticated?: string }) => {
  const router = useRouter()
  const params = useParams()

  const url = "/api/user"
  const { data: user, error, mutate } = useSWR(url, () =>
    axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
        router.push("/verify-email")
      })
  )

  const csrf = () => axios.get("/sanctum/csrf-cookie")

  const register = async (data: { first_name: string; last_name: string; email: string; password: string; role_id: number; password_confirmation: string }) => {
    try {
      await csrf()
      await axios.post("/register", data)
      mutate()
    } catch (error) {
      throw error
    }
  }

  const login = async (data: { email: string; password: string; remember: boolean }) => {
    try {
      await csrf()
      await axios.post("/login", data)
      mutate()
    } catch (error) {
      throw error
    }
  }

  const forgotPassword = async (data: { email: string }): Promise<AxiosResponse> => {
    try {
      await csrf()
      return await axios.post("/forgot-password", data)
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (data: { email: string; password: string; password_confirmation: string }) => {
    try {
      await csrf()
      const response = await axios.post("/reset-password", {
        ...data,
        token: params.token
      })
      router.push("/login?reset=" + btoa(response.data.status))
    } catch (error) {
      throw error
    }
  }

  const resendEmailVerification = async () => {
    try {
      return await axios.post("/email/verification-notification")
    } catch (error) {
      throw error
    }
  }

  const logout = useCallback(async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate())
    }
    window.location.pathname = `${params.locale}/login`
  }, [error, mutate, params.locale])

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }
    if (window.location.pathname === `${params.locale}/verify-email` && user?.email_verified_at && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated)
    }
    if (middleware === "auth" && error) logout()
  }, [user, error, middleware, redirectIfAuthenticated, router, params.locale, logout])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout
  }
}
