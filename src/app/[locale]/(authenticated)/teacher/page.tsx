import { GroupCard } from "@/components/GroupCard"
import UpsertGroupModal from "@/components/Modals/Teacher/UpsertGroupModal"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { fakeGroup } from "@/lib/fakeData"
import { getTeacherGroups, getTeacherRequestsCount } from "@/lib/queries/server/queries"
import { BadgeCheckIcon, ChevronRightIcon, MessageCircleIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

const DashboardPage = async () => {
  const t = await getTranslations()

  const requests = await getTeacherRequestsCount()
  const groups = await getTeacherGroups()

  return <div className="flex flex-col gap-8">

    <PageTitle>{t("general.dashboard")}</PageTitle>

    {/* Feedback and endorsements  */}
    <div>
      <SectionTitle>{t("general.feedbackAndEndorsementRequests")}</SectionTitle>
      <div className="flex gap-4">
        {/* Feedbacks */}
        <Link href="/teacher/requests/feedbacks">
          <div className="flex gap-4 border rounded-lg p-4 w-fit hover:bg-muted cursor-pointer">
            <div className="flex items-center gap-2">
              <MessageCircleIcon size={18} className="text-primary" />
              <span className="font-medium">{requests?.feedback_requests_count} {t("general.feedbacks")}</span>
            </div>
          </div>
        </Link>
        {/* Endorsements */}
        <Link href="/teacher/requests/endorsements">
          <div className="flex gap-4 border rounded-lg p-4 w-fit hover:bg-muted cursor-pointer">
            <div className="flex items-center gap-2">
              <BadgeCheckIcon size={18} />
              <span className="font-medium">{requests?.endorsement_requests_count} {t("general.endorsements")}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>

    {/* Groups of teacher */}
    <div>
      {/* Title, see all button and create button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SectionTitle>{t("general.yourGroups")}</SectionTitle>

          {/* See all */}
          <Link href="/teacher/groups">
            <Button type="button" variant="ghost" size="icon"><ChevronRightIcon size={20} /></Button>
          </Link>
        </div>
        {/* Create group */}
        <UpsertGroupModal>
          <Button>{t("modals.upsertGroup.create")}</Button>
        </UpsertGroupModal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {groups?.map(group => <GroupCard key={group.id} group={group} />)}
      </div>
    </div>

  </div>
}

export default DashboardPage
