"use client"
import React, { useState } from "react"

import { useAuth } from "@/hooks/auth"
import AuthCard from "@/components/AuthCard"
import ApplicationLogo from "@/components/ApplicationLogo"
import { Link } from "@/i18n/routing"

const Showcase = () => {
  const [status, setStatus] = useState<string>("")

  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard"
  })

  const onClickResend = () => {
    resendEmailVerification().then(response => setStatus(response.data.status))
  }

  return <div></div>
}

export default Showcase
