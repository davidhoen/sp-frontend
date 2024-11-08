import { SkillType } from "@/types"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import StarRating from "./StarRating"
import { Badge } from "./ui/badge"
import { Link } from "@/i18n/routing"
import { Button } from "./ui/button"

export default function SkillCard({ skill }: { skill: SkillType }) {
    const t = useTranslations("general")
    const isAdded = skill.ratingUpdates.length > 0
    const rating = isAdded ? skill.ratingUpdates[0].rating : 0
    return (
        <div className="flex flex-col border rounded-lg px-4 py-3">
            <div className="flex justify-between mb-1">
                <span className="font-medium text-xl">{skill.title}</span>
                <div>
                    <Button disabled={isAdded} variant="secondary" className="rounded-full h-8 w-8" size="icon">
                        {isAdded ?
                            <CheckIcon size={18} />
                            :
                            <PlusIcon size={18} />
                        }
                    </Button>
                </div>
            </div>
            <div className="mb-1">
                <Badge variant="secondary">{skill.competency.title}</Badge>
            </div>
            <div className="flex justify-between items-center">
                <StarRating rating={rating} />
                {/* Disable button when skill is not added (yet) */}
                <Link href={`/skills/${skill.id}`}>
                    <Button size="sm" disabled={!isAdded}>{t("addFeedback")}</Button>
                </Link>
            </div>
        </div>
    )
}
