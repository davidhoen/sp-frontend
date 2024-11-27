"use client"

import { Link, useRouter } from "@/i18n/routing"
import { getMostRecentRating, triggerPromiseToast } from "@/lib"
import axios from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { SkillType } from "@/types"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import StarRating from "./StarRating"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export default function SkillCard({ skill, mutate }: { skill: SkillType, mutate?: () => void }) {
    const t = useTranslations("general")
    const router = useRouter()
    const { basePath } = useUser()

    const rating = skill.ratings ? getMostRecentRating(skill.ratings)?.rating || 0 : 0

    const addSkill = async () => {
        try {
            const res = axios.post(`/api/student/skills/${skill.id}/add`)
            await triggerPromiseToast(res, t)
            mutate && mutate()
            router.push(`${basePath}/skills/${skill.id}`)
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
                <Link href={`${basePath}/skills/${skill.id}`}>
                    <Button size="sm" disabled={!skill.is_added}>{t("addFeedback")}</Button>
                </Link>
            </div>
        </div>
    )
}
