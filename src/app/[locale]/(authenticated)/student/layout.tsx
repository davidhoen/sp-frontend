"use client"

import { useUser } from "@/providers/UserProvider"
import { BookIcon, StarIcon, UsersIcon, StarsIcon, ArrowBigLeft, UserIcon } from "lucide-react"
import { ReactNode } from "react"
import Loading from "../../loading"
import SideBar from "@/components/Navigation/SideBar"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser()
  if (!user) return <Loading />

  const menuItems = [
    { title: "Dashboard", url: `/student`, icon: BookIcon },
    { title: "Skills", url: `/student/skills`, icon: StarIcon },
    { title: "Groups", url: `/student/groups`, icon: UsersIcon },
    { title: "Competencies", url: `/student/competencies`, icon: StarsIcon },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
