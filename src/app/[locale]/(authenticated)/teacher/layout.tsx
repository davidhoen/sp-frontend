
import SideBar from "@/components/Navigation/SideBar"
import { getTranslations } from "next-intl/server"
import { ReactNode } from "react"

const StudentLayout = async ({ children }: { children: ReactNode }) => {
  const t = await getTranslations("general")

  const menuItems = [
    { title: t("dashboard"), url: `/teacher`, icon: "Book" },
    { title: t("requests"), url: `/teacher/requests`, icon: "Bell" },
    { title: t("groups"), url: `/teacher/groups`, icon: "Group" },
    { title: t("skills"), url: `/teacher/skills`, icon: "Star" },
    { title: t("students"), url: `/teacher/students`, icon: "Users" },
    { title: t("competencies"), url: `/teacher/competencies`, icon: "Target", adminOnly: true },
    { title: t("profiles"), url: `/teacher/profiles`, icon: "GraduationCap", adminOnly: true },
  ]

  return <SideBar items={menuItems}>
    <div className="p-6">
      {children}
    </div>
  </SideBar>
}

export default StudentLayout
