"use client"

import { useUser } from "@/providers/UserProvider";
import { TimeLine } from "./TimeLine";

export default function TimeLineWithUser({ skillId }: { skillId: string }) {
    const { user } = useUser()
    if (!user) return null
    return <TimeLine user={user} skillId={skillId} />
}