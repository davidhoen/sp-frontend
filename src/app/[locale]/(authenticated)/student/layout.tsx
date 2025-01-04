
import SideBar from "@/components/Navigation/SideBar"
import { getTranslations } from "next-intl/server"
import { ReactNode } from "react"

const StudentLayout = async ({ children }: { children: ReactNode }) => {
  const t = await getTranslations("general")

  const menuItems = [
    { title: t("dashboard"), url: `/student`, icon: "Book", isDashboard: true },
    { title: t("skills"), url: `/student/skills`, icon: "Star" },
    { title: t("groups"), url: `/student/groups`, icon: "Users" },
    { title: t("competencies"), url: `/student/competencies`, icon: "Star" },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
