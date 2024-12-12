"use client"

import { Link, useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { cn } from "@/lib/utils"
import { SkillType } from "@/types"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import StarRating from "./StarRating"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

export default function SkillCard({ skill, className, mutate }: { skill: SkillType, className?: string, mutate?: () => void }) {
    const t = useTranslations("general")
    const router = useRouter()

    const addSkill = async () => {
        try {
            const res = axiosInstance.post(`/api/student/skills/${skill.id}/add`)
            await triggerPromiseToast(res, t)
            mutate && mutate()
            router.push(`/student/skills/${skill.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={cn("flex flex-col border rounded-lg px-4 py-3", className)}>
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
                <Badge variant="secondary">{skill.competency?.title}</Badge>
            </div>
            <div className="flex justify-between items-center">
                <StarRating rating={skill.rating} />
                {/* Disable button when skill is not added (yet) */}
                <Link href={`/student/skills/${skill.id}`}>
                    <Button size="sm" disabled={!skill.is_added}>{t("addFeedback")}</Button>
                </Link>
            </div>
        </div>
    )
}
