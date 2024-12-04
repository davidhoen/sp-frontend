import { GroupCard } from "@/components/GroupCard"
import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import { Link } from "@/i18n/routing"
import { getCompetencyRating } from "@/lib"
import { getEnrolledGroups, getProfiles, getRecentEndorsements, getStudentCompetencies } from "@/lib/queries/server/queries"
import { BadgeCheckIcon, PlusIcon, UserIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

const DashboardPage = async () => {
  const t = await getTranslations()

  const profiles = await getProfiles()
  const groups = await getEnrolledGroups()
  const competencies = await getStudentCompetencies()
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
      <SectionTitle information={t("general.definitions.competencies")} numberOfItems={competencies?.length}>{t("general.competencies")}</SectionTitle>
      <div className="flex flex-wrap md:flex-nowrap md:flex-row gap-2 w-full mb-2">
        {competencies?.slice(0, 3).map((competency) => {
          const rating = getCompetencyRating(competency)
          return (
            <Link key={competency.id} href={`/student/competencies/${competency.id}`}>
              <div className="flex justify-between items-center p-4 border rounded-lg w-full md:w-80 min-w-max hover:bg-muted">

                <div className="flex flex-col">
                  {/* Title and # skills */}
                  <div className="flex items-center gap-2">
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

              </div>
            </Link>
          )
        })}
      </div>
      {/* View all competencies */}
      {(competencies && competencies?.length > 3) &&
        <div className="mx-auto md:mx-2 mb-3">
          <Link href="/student/competencies">
            <Button size="sm" className="rounded-full ">
              {t("general.viewAll")}
            </Button>
          </Link>
        </div>
      }
    </div >

    {/* Profiles */}
    <div>
      <SectionTitle information={t("general.definitions.profiles")}> {t("general.profiles")}</SectionTitle >
      <div className="grid grid-cols-2 md:flex gap-2 ">
        {profiles?.map((profile) => <ProfileTile key={profile.id} profile={profile} />)}
      </div>
    </div>

    {/* Enrolled groups */}
    <div>
      <SectionTitle numberOfItems={groups?.length}>{t("general.enrolledGroups")}</SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar ">
        {groups?.map((group) => <GroupCard className="w-80" key={group.id} group={group} />)}
      </div>
    </div>

    {/* Recent endorsments */}
    <div>
      <SectionTitle>{t("general.recentEndorsements")}</SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar bg-sidebar-accent p-2 rounded-md">
        {recentEndorsements?.map((endorsement) => <Link key={endorsement.id} href={{ pathname: `/student/skills/${endorsement.skill.id}`, hash: t("general.endorsements") }} >
          <div className="flex items-center gap-2 rounded-full bg-background">
            <UserAvatar user={endorsement?.user} />
            <div className="flex flex-col">
              <span className="font-bold">{endorsement.skill?.title}</span>
              <span className="text-sm truncate">{endorsement.content}</span>
            </div>
          </div>
        </Link>)}
      </div>
    </div>

  </div >
}

export default DashboardPage
