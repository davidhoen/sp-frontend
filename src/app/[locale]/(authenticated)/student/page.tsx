import { GroupCard } from "@/components/GroupCard"
import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import { Link } from "@/i18n/routing"
import { getCompetencyRating } from "@/lib"
import { fakeCompetency, fakeSkill, fakeSkill2 } from "@/lib/fakeData"
import { getCompetencies } from "@/lib/queries/client/queries"
import { getEnrolledGroups, getProfiles, getRecentEndorsements } from "@/lib/queries/server/queries"
import { BadgeCheckIcon, ChevronRightIcon, PlusIcon, UserIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

const DashboardPage = async () => {
  const t = await getTranslations()

  const profiles = await getProfiles()
  const groups = await getEnrolledGroups()
  const competencies = await getCompetencies({ page: 1, search: "" }) ?? { data: [{ ...fakeCompetency, skills: [fakeSkill, fakeSkill2] }], meta: { current_page: 1, last_page: 1, per_page: 10, total: 2, } }
  const recentEndorsements = await getRecentEndorsements()

  return <div className="flex flex-col gap-8">

    <PageTitle>{t("general.dashboard")}</PageTitle>

    {/* Action buttons (add skill and public profile) */}
    <div className="flex gap-2">
      <Link href={{ pathname: `/student/skills/`, query: "is_added=false" }}>
        <Button className="rounded-full"><PlusIcon size={16} />{t("general.addASkill")}</Button>
      </Link>
      <Button className="rounded-full" variant="outline"><UserIcon size={16} />{t("general.publicProfile")}</Button>
    </div>

    { /* Competencies  */}
    <div>
      <SectionTitle numberOfItems={competencies?.data?.length}>{t("general.competencies")}</SectionTitle>
      <div className="flex flex-wrap border rounded-md">
        {competencies?.data?.map((competency) => {
          const rating = getCompetencyRating(competency)
          return (
            <div key={competency.id} className="relative flex p-4 w-full">

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

              {/* Average rating */}
              <div>
                <StarRating rating={rating} />
              </div>

              <div className="absolute right-6 bottom-6">
                <ChevronRightIcon size={16} />
              </div>

            </div>
          )
        })}
      </div>
    </div >

    {/* Profiles */}
    <div>
      <SectionTitle> {t("general.profiles")}</SectionTitle >
      <div className="grid grid-cols-2 md:flex gap-2 ">
        {profiles?.map((profile) => <ProfileTile key={profile.id} profile={profile} />)}
      </div>
    </div>

    {/* Enrolled groups */}
    <div>
      <SectionTitle numberOfItems={groups?.length}>{t("general.enrolledGroups")}</SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar ">
        {groups?.map((group) => <GroupCard key={group.id} group={group} />)}
      </div>
    </div>

    {/* Recent endorsments */}
    <div>
      <SectionTitle>{t("general.recentEndorsements")}</SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar ">
        {recentEndorsements?.map((endorsement) => <div>
          <div className="flex items-center gap-2">
            <UserAvatar user={endorsement.user} />
            <div>
              <span>{endorsement.skill.title}</span>
              <span>{endorsement.content}</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>


  </div >
}

export default DashboardPage
