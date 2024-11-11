import { useTranslations } from "next-intl"
import React from "react"

const DashboardPage = () => {
  const t = useTranslations("students")
  return <div className="p-8 w-screen">{t("loggedIn")}</div>
}

export default DashboardPage
