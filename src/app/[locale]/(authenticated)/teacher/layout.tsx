
import SideBar from "@/components/Navigation/SideBar"
import { ReactNode } from "react"

const StudentLayout = ({ children }: { children: ReactNode }) => {
  const menuItems = [
    { title: "Dashboard", url: `/teacher`, icon: "Book" },
    { title: "Requests", url: `/student/skills`, icon: "Bell" },
    { title: "Groups", url: `/student/groups`, icon: "Group" },
    { title: "Skills", url: `/student/competencies`, icon: "Star" },
    { title: "Students", url: `/student/competencies`, icon: "Users" },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
