
import UpdateRatingModal from "@/components/Modals/UpdateRatingModal"
import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import { TimeLine } from "@/components/Timeline/TimeLine"
import TimeLineWithUser from "@/components/Timeline/TimeLineWithUser"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { getMostRecentRating } from "@/lib"
import { getSkill } from "@/lib/queries"
import { ProfileType } from "@/types"
import { PencilIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

const SkillsDetail = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("general")
    let skill = await getSkill(params.id)

    skill = {
        id: 1,
        title: "Presenting",
        desc: "React is a JavaScript library for building user interfaces",
        competency: {
            id: 1,
            title: "Communication",
            desc: "You have a good understanding of the subject matter and can apply it in real-world scenarios",
            overview: "Competency overview",
            skills: [],
            profiles: [
                { id: 1, title: "Director", desc: "", icon: "Clapperboard", created_at: new Date() } as ProfileType,
                { id: 2, title: "Technologist", desc: "", icon: "MonitorCog", created_at: new Date() } as ProfileType
            ],
            created_at: new Date(),
        },
        ratings: [
            // {
            //     rating: 3,
            //     // two days ago
            //     created_at: new Date(new Date().setDate(new Date().getDate() - 2))
            // },
            // {
            //     rating: 4,
            //     created_at: new Date()
            // }
        ],
        created_at: new Date(),
        groups_count: 0,
        is_added: true,
    }

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
                <UpdateRatingModal currentRating={getMostRecentRating(skill.ratings)}>
                    <div className="flex items-center bg-border p-1 rounded-full"><PencilIcon size={15} /></div>
                </UpdateRatingModal>
            </div>
        </div>

        <div>
            <SectionTitle>{t("yourJourney")}</SectionTitle>
            <TimeLineWithUser items={[]} skillId={skill.id} />
        </div>
    </div>
}

export default SkillsDetail