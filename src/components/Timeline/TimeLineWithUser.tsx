"use client"

import { TimeLineItemType } from "@/types";
import { TimeLine } from "./TimeLine";
import { useUser } from "@/providers/UserProvider";

export default function TimeLineWithUser({ items, skillId }: { items: TimeLineItemType[], skillId: number }) {
    const { user } = useUser()
    if (!user) return null
    return <TimeLine items={items} user={user} skillId={skillId} />
}