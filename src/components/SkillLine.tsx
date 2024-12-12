"use client"

import { Link } from "@/i18n/routing"
import { SkillType } from "@/types"
import StarRating from "./StarRating"

export default function SkillLine({ skill }: { skill: SkillType, }) {

    return (<Link href={`/student/skills/${skill.id}/`}>
        <div className="flex justify-between hover:bg-accent p-2 rounded-md">
            <span>{skill.title}</span>
            <StarRating rating={skill.rating} />
        </div>
    </Link>
    )
}
