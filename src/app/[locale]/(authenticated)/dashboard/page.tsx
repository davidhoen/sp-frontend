import { useTranslations } from "next-intl"
import React from 'react'

const DashboardPage = () => {
  const t = useTranslations("students")
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            {t("loggedIn")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
