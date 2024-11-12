import { SkillType } from "@/types"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import StarRating from "./StarRating"
import { Badge } from "./ui/badge"
import { Link } from "@/i18n/routing"
import { Button } from "./ui/button"
import axios from "@/lib/axios"

export default function SkillCard({ skill, mutate }: { skill: SkillType, mutate?: () => void }) {
    const t = useTranslations("general")
    const rating = skill.is_added ? skill.ratings[0].rating : 0

    const addSkill = async () => {
        try {
            await axios.post(`/api/student/skills/${skill.id}/add`)
            mutate && mutate()
            skill.is_added = true
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col border rounded-lg px-4 py-3">
            <div className="flex justify-between mb-1">
                <span className="font-medium text-xl">{skill.title}</span>
                <div>
                    <Button disabled={skill.is_added} variant="secondary" className="rounded-full h-8 w-8" size="icon" onClick={addSkill}>
                        {skill.is_added ?
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
                    <Button size="sm" disabled={!skill.is_added}>{t("addFeedback")}</Button>
                </Link>
            </div>
        </div>
    )
}
