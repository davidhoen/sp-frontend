import CompetencyCard from "@/components/CompetencyCard"
import ProfileTile from "@/components/ProfileTile"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { getProfile, getProfileCompetencies, getProfiles } from "@/lib/queries/server/queries"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const ProfileDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")
    const profile = await getProfile(params.id)
    const competencies = await getProfileCompetencies(params.id)
    const profiles = await getProfiles()

    if (!profile) notFound()

    return <div className="flex flex-col gap-6">

        {/* Title */}
        <PageTitle className="mb-4">{profile.title}</PageTitle>
        {/* Description */}
        <p>{profile.desc}</p>

        {/* Top three competencies */}
        <div>
            <SectionTitle>{t("competencies")}</SectionTitle>
            <div className="grid sm:grid-cols-2 md:flex md:flex-row gap-2 w-full mb-2">
                {/* Filter competencies without an avg rating */}
                {competencies?.filter((competency => competency.avgRating)).slice(0, 3).map((competency) => <CompetencyCard key={competency.id} competency={competency} />)}
            </div>
        </div>

        {/* Chart */}
        <div></div>

        {/* Other profiles */}
        <div>
            <SectionTitle>{t("other")} {t("profiles").toLowerCase()}</SectionTitle>
            <div className="grid grid-cols-2 md:flex gap-2 ">
                {profiles?.filter(otherProfile => otherProfile.id != profile.id).map((profile) => <ProfileTile key={profile.id} profile={profile} />)}
            </div>
        </div>
    </div>
}

export default ProfileDetail