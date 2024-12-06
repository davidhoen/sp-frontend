import PageTitle from "@/components/Typography/PageTitle"
import { getTranslations } from "next-intl/server"

const DashboardPage = async () => {
  const t = await getTranslations()

  return <div className="flex flex-col gap-8">

    <PageTitle>{t("general.dashboard")}</PageTitle>

  </div>
}

export default DashboardPage
