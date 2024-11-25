import { EndorsementsList } from "@/components/EndorsementsList"
import { FeedbacksList } from "@/components/FeedbacksList"
import AddFeedbackModal from "@/components/Modals/AddFeedbackModal"
import RequestEndorsementModal from "@/components/Modals/RequestEndorsementModal"
import RequestFeedbackModal from "@/components/Modals/RequestFeedbackModal"
import UpdateRatingModal from "@/components/Modals/UpdateRatingModal"
import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import TimeLineWithUser from "@/components/Timeline/TimeLineWithUser"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Button } from "@/components/ui/button"
import { getMostRecentRating } from "@/lib"
import { fakeSkill } from "@/lib/fakeData"
import { getSkill } from "@/lib/queries"
import { BadgeCheckIcon, MessageCircleIcon, PencilIcon, PlusIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

const SkillsDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")
    // TODO: Replace with const and remove fakeSkill
    let skill = await getSkill(params.id)

    if (!skill)
        skill = fakeSkill

    // if (!skill)
    //     return t("noSkillFound")

    return <div className="flex flex-col gap-2">

        {/* Title and profiles */}
        <div className="flex justify-between">
            <PageTitle>{skill.title}</PageTitle>
            <div className="flex gap-2">
                {skill?.competency?.profiles.map((profile) => <ProfileTile key={profile.id} profile={profile} variant="icon" />)}
            </div>
        </div>

        {/* Description */}
        <p>{skill?.desc}</p>

        {/* Rating */}
        <div className="mt-4">
            <SectionTitle>{t("rating")}</SectionTitle>

            <div className="flex gap-4">
                {/* Star rating */}
                <StarRating rating={getMostRecentRating(skill.ratings)?.rating || 0} />

                {/* Edit rating */}
                <UpdateRatingModal currentRating={getMostRecentRating(skill.ratings)} skillId={skill.id}>
                    <div className="flex items-center bg-border p-1 rounded-full"><PencilIcon size={15} /></div>
                </UpdateRatingModal>
            </div>
        </div>

        {/* Skill journey */}
        <div>
            <SectionTitle>{t("yourJourney")}</SectionTitle>
            <TimeLineWithUser skillId={skill.id} />
        </div>

        {/* Feedbacks */}
        <div className="mt-6">
            <FeedbacksList skillId={skill.id} />

            {/* Request and add feedback buttons */}
            <div className="flex gap-2 flex-wrap">
                <RequestFeedbackModal skillId={skill.id}>
                    <Button variant="outline" size="sm" className="w-full sm:w-fit">
                        <MessageCircleIcon size={16} />
                        {t("requestFeedback")}
                    </Button>
                </RequestFeedbackModal>
                <AddFeedbackModal skillId={skill.id}>
                    <Button variant="outline" size="sm" className="w-full sm:w-fit">
                        <PlusIcon size={16} />
                        {t("addFeedback")}
                    </Button>
                </AddFeedbackModal>
            </div>

        </div>

        {/* Endorsements */}
        <div className="mt-6">
            <EndorsementsList skillId={skill.id} />
            {/* Request endorsement button */}
            <RequestEndorsementModal skillId={skill.id}>
                <Button variant="outline" className="w-full sm:w-fit" size="sm">
                    <BadgeCheckIcon size={16} />
                    {t("requestEndorsement")}
                </Button>
            </RequestEndorsementModal>
        </div>

    </div>
}

export default SkillsDetail