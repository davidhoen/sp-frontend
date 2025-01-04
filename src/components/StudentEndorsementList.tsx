"use client"

import { useStudentRecentEndorsements } from "@/hooks/use-student-recent-endorsements"
import { RecentEndorsementsList } from "./RecentEndorsementList"

export function StudentEndorsementList({ studentId }: { studentId: string }) {
    let { data: endorsements, isLoading } = useStudentRecentEndorsements(studentId)

    return <RecentEndorsementsList loading={isLoading} endorsements={endorsements} />
}
