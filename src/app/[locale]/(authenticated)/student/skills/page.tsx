import PageTitle from "@/components/Typography/PageTitle"
import { useTranslations } from "next-intl"

const SkillsOverview = () => {
    const t = useTranslations("general")
    return <div>
        <PageTitle>{t("skills")}</PageTitle>

    </div>
}

export default SkillsOverview