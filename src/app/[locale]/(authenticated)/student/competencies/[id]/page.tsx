import ProfileTile from "@/components/ProfileTile"
import SkillLine from "@/components/SkillLine"
import StarRating from "@/components/StarRating"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { getCompetencyRating } from "@/lib"
import { fakeCompetency, fakeSkill, fakeSkill2 } from "@/lib/fakeData"
import { getCompetency } from "@/lib/queries"
import { getTranslations } from "next-intl/server"

const CompetencyDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")
    let competency = await getCompetency(params.id)

    if (!competency)
        competency = { ...fakeCompetency, skills: [fakeSkill, fakeSkill2] }

    // if (!competency)
    //     return t("noSkillFound")

    const avgRating = getCompetencyRating(competency)

    return <div className="flex flex-col gap-2">

        {/* Title and profiles */}
        <div className="flex justify-between">
            <PageTitle>{competency.title}</PageTitle>
            <div className="flex gap-2">
                {competency?.profiles.map((profile) => <ProfileTile key={profile.id} profile={profile} variant="icon" />)}
            </div>
        </div>

        {/* Description */}
        <p>{competency?.desc}</p>

        {/* Rating */}
        <div className="my-4">
            <SectionTitle>{t("rating")}</SectionTitle>

            <div className="flex gap-4">
                {/* Star rating */}
                <StarRating rating={avgRating || 0} />
            </div>
        </div>

        <div>
            <SectionTitle>{t("overview")}</SectionTitle>
            <p>{competency?.overview}</p>
        </div>

        {/* Related skills */}
        <div className="mt-6">
            <SectionTitle numberOfItems={competency.skills?.length}>{t("skills")}</SectionTitle>
            <div className="grid gap-4 max-w-xs">
                {competency?.skills.map((skill) => <SkillLine key={skill.id} skill={skill} />)}
            </div>
        </div>
    </div>
}

export default CompetencyDetail