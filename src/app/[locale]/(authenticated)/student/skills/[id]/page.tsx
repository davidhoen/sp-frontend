
import StarRating from "@/components/StarRating"
import { TimeLine } from "@/components/Timeline/TimeLine"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { getSkill } from "@/lib/queries"
import { getTranslations } from "next-intl/server"

const SkillsDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")

    const skill = await getSkill(params.id)

    // if (!skill)
    //     return t("noSkillFound")

    return <div className="w-full">
        <PageTitle>{t("skills")}</PageTitle>
        <p>{skill?.desc}</p>

        <SectionTitle>{t("rating")}</SectionTitle>
        <StarRating rating={2} />

        <TimeLine items={[]} />
    </div>
}

export default SkillsDetail