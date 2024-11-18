"use client"

import { useAuth } from "@/hooks/auth"
import { UserType } from "@/types/User"
import React, { createContext, useContext, ReactNode } from "react"

interface AuthContextType {
  user: UserType | undefined
  basePath: string
  register: (data: { first_name: string; last_name: string; role_id: number; email: string; password: string; password_confirmation: string }) => Promise<void>
  login: (data: { email: string; password: string; remember: boolean }) => Promise<void>
  forgotPassword: (data: { email: string }) => Promise<any>
  resetPassword: (data: { email: string; password: string; password_confirmation: string }) => Promise<void>
  resendEmailVerification: () => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const auth = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/student"
  })

  const roleBasePathMap: { [key: string]: string } = {
    student: "/student",
    teacher: "/teacher",
    head_teacher: "/teacher",
    admin: "/teacher",
  };

  const basePath = roleBasePathMap[auth.user?.role.name] || "/";

  const value = {
    // TODO: Remove basepath overwrite when teacher environment is ready
    basePath: "/student",
    user: auth.user,
    register: auth.register,
    login: auth.login,
    forgotPassword: auth.forgotPassword,
    resetPassword: auth.resetPassword,
    resendEmailVerification: auth.resendEmailVerification,
    logout: auth.logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useUser() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
