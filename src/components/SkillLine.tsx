"use client"

import { Link } from "@/i18n/routing"
import { getMostRecentRating } from "@/lib"
import { SkillType } from "@/types"
import StarRating from "./StarRating"

export default function SkillLine({ skill }: { skill: SkillType, }) {

    return (<Link href={`/student/skills/${skill.id}/`}>
        <div className="flex justify-between hover:bg-accent p-2 rounded-md">
            <span>{skill.title}</span>
            <StarRating rating={getMostRecentRating(skill.ratings)?.rating || 0} />
        </div>
    </Link>
    )
}
