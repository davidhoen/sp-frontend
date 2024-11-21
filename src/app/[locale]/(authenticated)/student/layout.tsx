"use client"

import { useUser } from "@/providers/UserProvider"
import { BookIcon, StarIcon, UsersIcon, StarsIcon, ArrowBigLeft, UserIcon } from "lucide-react"
import { ReactNode } from "react"
import Loading from "../../loading"
import SideBar from "@/components/Navigation/SideBar"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()
  if (!user) return <Loading />


  // const basePath = user.role.name === "student" ? "/student" : "/teacher"
  const basePath = "/student"

  const menuItems = [
    { title: "Dashboard", url: `${basePath}`, icon: BookIcon },
    { title: "Skills", url: `${basePath}/skills`, icon: StarIcon },
    { title: "Groups", url: "#", icon: UsersIcon },
    { title: "Competencies", url: `${basePath}/competencies`, icon: StarsIcon },
    { title: "Profiles", url: "#", icon: ArrowBigLeft },
    { title: "Public Profile", url: "#", icon: UserIcon }
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
