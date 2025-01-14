"use client"

import { Link } from "@/i18n/routing"
import { CompetencyType } from "@/types"
import { BadgeCheckIcon, MessageCircleIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import StarRating from "./StarRating"
import { Button } from "./ui/button"
import { getMostRecentRating, isNewestRatingApproved } from "@/lib"

// This component is only used on the compentecies overview page. The card will display more information about the competency.
export default function CompetenciesCard({ competency, mutate }: { competency: CompetencyType, mutate?: () => void }) {
    const t = useTranslations("general")

    // Sort competency skills by newest ratings rating
    competency.skills?.sort((a, b) => {
        const ratingA = getMostRecentRating(a.ratings) || 0
        const ratingB = getMostRecentRating(b.ratings) || 0
        return ratingB - ratingA
    })

    return (
        <div className="relative flex flex-col border rounded-lg px-4 py-3 pb-12">

            {/* Title and description */}
            <div className="mb-4">
                <span className="font-medium text-xl">{competency.title}</span>
                <div className="text-muted-foreground text-sm">{competency.desc}</div>
            </div>

            {/* Top 3 skills */}
            <div className="mb-4">
                <span className="font-medium">{t("topSkills")}</span>
                <div className="flex flex-col gap-1">
                    {competency?.skills?.slice(0, 3).map((skill, index) => (
                        <div className="flex justify-between" key={index}>
                            <span className="">{skill.title}</span>
                            <StarRating rating={getMostRecentRating(skill.ratings)} approved={isNewestRatingApproved(skill.ratings)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback and endorsements */}
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-1">
                    <MessageCircleIcon size={16} />
                    <span className="font-medium">{competency.feedbacks_count || 0} {t("feedbacks")}</span>
                </div>
                <div className="flex items-center gap-1">
                    <BadgeCheckIcon size={16} />
                    <span className="font-medium">{competency.endorsements_count || 0} {t("endorsements")}</span>
                </div>
            </div>

            <div className="absolute bottom-2 w-full">
                <Link href={`/student/competencies/${competency.id}`}>
                    <Button variant="outline" className="w-full">
                        {t("view")}
                    </Button>
                </Link>
            </div>

        </div>
    )
}
