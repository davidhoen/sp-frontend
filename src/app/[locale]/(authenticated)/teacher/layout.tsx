
import SideBar from "@/components/Navigation/SideBar"
import { ReactNode } from "react"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const menuItems = [
    { title: "Dashboard", url: `/teacher`, icon: "Book" },
    { title: "Requests", url: `/teacher/requests`, icon: "Bell" },
    { title: "Groups", url: `/teacher/groups`, icon: "Group" },
    { title: "Skills", url: `/teacher/skills`, icon: "Star" },
    { title: "Students", url: `/teacher/students`, icon: "Users" },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
