"use client"

import { Link } from "@/i18n/routing"
import { SkillType } from "@/types"
import StarRating from "./StarRating"
import { getMostRecentRating } from "@/lib"

export default function SkillLine({ skill }: { skill: SkillType, }) {

    return (<Link href={`/student/skills/${skill.id}/`}>
        <div className="flex justify-between hover:bg-accent p-2 rounded-md">
            <span>{skill.title}</span>
            <StarRating rating={getMostRecentRating(skill.ratings)} />
        </div>
    </Link>
    )
}
