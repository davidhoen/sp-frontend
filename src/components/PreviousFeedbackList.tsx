"use client"

import { useStudentSkillFeedbacks } from "@/hooks/use-student-skill-feedbacks";
import { FeedbackType } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import { Pager } from "./Pager";
import { Alert } from "./ui/alert";

export const PreviousFeedbackList = ({ studentId, skillId }: { studentId: string, skillId: string }) => {
    const t = useTranslations("general")
    const format = useFormatter()

    const { data: feedbacks, isLoading } = useStudentSkillFeedbacks(studentId, skillId)

    const renderFeedbacks = (feedback: FeedbackType) => <div key={feedback.title}>
        <div className="font-medium">{feedback.title}</div>
        <div>{feedback.content}</div>
        <div className="text-muted-foreground">{format.dateTime(new Date(feedback.created_at), { dateStyle: "medium" })}</div>
    </div>

    return (
        <Alert className="flex flex-col gap-4 text-sm">
            <Pager
                pagerObject={feedbacks}
                renderItem={renderFeedbacks}
                loading={isLoading}
                emptyMessage={t("noEntitiesFound", { entities: t("feedbacks").toLowerCase() })}
                wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start"
                entityKey="skillFeedbacksPage"
            />
        </Alert>
    );
};