import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { fakeCompetency, fakeSkill, fakeSkill2 } from "@/lib/fakeData"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { DashboardButtons } from "./_components/DashboardButtons"
import { getCompetencies, getGroups, getProfiles } from "@/lib/queries/client/queries"

const DashboardPage = async () => {
  const t = await getTranslations()

  const profiles = await getProfiles()
  const competencies = await getCompetencies({ page: 1, search: "" }) ?? { data: [{ ...fakeCompetency, skills: [fakeSkill, fakeSkill2] }], meta: { current_page: 1, last_page: 1, per_page: 10, total: 2, } }
  const groups = await getGroups({ page: 1, search: "", isJoined: "true" })
  // const recentEndorsements = getRecentEndorsements()

  return <div className="flex flex-col gap-8">

    <PageTitle>{t("general.dashboard")}</PageTitle>

    {/* Action buttons (add skill and public profile) */}
    <DashboardButtons />

    { /* Competencies  */}
    <div>
      <SectionTitle numberOfItems={competencies?.data?.length}>{t("general.competencies")}</SectionTitle>
      <div className="flex flex-wrap border rounded-md">
        {competencies?.data?.map((competency) => <div key={competency.id} className="relative flex p-4 w-full">

          <div className="flex flex-col">
            {/* Title and # skills */}
            <div className="flex mb-4 items-center gap-4">
              <span className="font-medium">{competency.title}</span>
              <span className="text-xs text-muted-foreground">{competency.skills?.length} {t("general.skills")}</span>
            </div>
            {/* # endorsements */}
            <div className="flex items-center gap-1">
              <BadgeCheckIcon size={16} />
              <span className="">{competency.endorsements_count || 0} {t("general.endorsements")}</span>
            </div>
          </div>

          {/* Star rating */}
          <div>
            <StarRating rating={2} />
          </div>

          <div className="absolute right-6 bottom-6">
            <ChevronRightIcon size={16} />
          </div>

        </div>)}
      </div>
    </div >

    {/* Profiles */}
    <SectionTitle> {t("general.profiles")}</SectionTitle >
    <div className="flex flex-wrap">
      {profiles?.map((profile) => <ProfileTile key={profile.id} profile={profile} />)}
    </div>

    <SectionTitle numberOfItems={groups?.data?.length}>{t("general.enrolledGroups")}</SectionTitle>

    <SectionTitle>{t("general.recentEndorsements")}</SectionTitle>


  </div >
}

export default DashboardPage
