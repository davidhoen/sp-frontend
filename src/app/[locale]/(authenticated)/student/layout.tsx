
import SideBar from "@/components/Navigation/SideBar"
import { ReactNode } from "react"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const menuItems = [
    { title: "Dashboard", url: `/student`, icon: "Book" },
    { title: "Skills", url: `/student/skills`, icon: "Star" },
    { title: "Groups", url: `/student/groups`, icon: "Users" },
    { title: "Competencies", url: `/student/competencies`, icon: "Star" },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
