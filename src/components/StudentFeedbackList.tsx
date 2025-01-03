"use client"

import { useStudentRecentFeedbacks } from "@/hooks/use-student-recent-feedbacks"
import { RecentFeedbacksList } from "./RecentFeedbacksList"

export function StudentFeedbackList({ studentId }: { studentId: string }) {
    let { data: feedbacks, isLoading } = useStudentRecentFeedbacks(studentId)

    return <RecentFeedbacksList loading={isLoading} feedbacks={feedbacks} />
}
