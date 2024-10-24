"use client"

import SideBar from "@/components/Navigation/SideBar"
import { useUser } from "@/providers/UserProvider"
import { ArrowBigLeft, BookIcon, StarIcon, StarsIcon, UserIcon, UsersIcon } from "lucide-react"
import { ReactNode } from "react"
import Loading from "../loading"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()
  if (!user) return <Loading />

  const menuItems = [
    { title: "Dashboard", url: "#", icon: BookIcon, isActive: true },
    { title: "My Skills", url: "#", icon: StarIcon },
    { title: "Groups", url: "#", icon: UsersIcon },
    { title: "Competences", url: "#", icon: StarsIcon },
    { title: "Profiles", url: "#", icon: ArrowBigLeft },
    { title: "Public Profile", url: "#", icon: UserIcon }
  ]

  return <SideBar items={menuItems}>{children}</SideBar>
}

export default StudentLayout
