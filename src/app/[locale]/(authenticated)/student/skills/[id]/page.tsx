
import StarRating from "@/components/StarRating"
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

        {/* <TimeLine items={[]} user /> */}
    </div>
}

export default SkillsDetail