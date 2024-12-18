"use client"

import { Link } from "@/i18n/routing"
import { getCompetencyRating } from "@/lib"
import { CompetencyType } from "@/types"
import { BadgeCheckIcon } from "lucide-react"
import StarRating from "./StarRating"
import { useTranslations } from "next-intl"

export default function CompetencyCard({ competency }: { competency: CompetencyType }) {
    const t = useTranslations("general")
    const rating = getCompetencyRating(competency)
    return (
        <Link key={competency.id} href={`/student/competencies/${competency.id}`}>
            <div className="flex justify-between items-center p-4 border rounded-lg w-full md:w-80 min-w-max hover:bg-muted">

                <div className="flex flex-col">
                    {/* Title and # skills */}
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{competency.title}</span>
                        <span className="text-xs text-muted-foreground">{competency.skills?.length} {t("skills")}</span>
                    </div>
                    {/* # endorsements */}
                    <div className="flex items-center gap-1">
                        <BadgeCheckIcon size={16} />
                        <span className="">{competency.endorsements_count || 0} {t("endorsements")}</span>
                    </div>
                </div>

                {/* Average rating */}
                <div>
                    <StarRating rating={rating} />
                </div>
            </div>
        </Link>
    )
}
