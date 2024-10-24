"use client"

import { UserProvider } from "@/providers/UserProvider"
import { ReactNode } from "react"

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <div className="min-h-screen">{children}</div>
    </UserProvider>
  )
}

export default AppLayout
