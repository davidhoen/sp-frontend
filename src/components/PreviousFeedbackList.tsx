"use client"

import { FeedbackType } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import { Alert } from "./ui/alert";

export const PreviousFeedbackList = ({ feedbacks }: { feedbacks: FeedbackType[] }) => {
    const t = useTranslations("general");
    const format = useFormatter()

    return (
        <Alert className="flex flex-col gap-4 text-sm">
            {feedbacks.map(feedback => <div key={feedback.title}>
                <div className="font-medium">{feedback.title}</div>
                <div>{feedback.content}</div>
                <div className="text-muted-foreground">{format.dateTime(new Date(feedback.created_at), { dateStyle: "medium" })}</div>
            </div>)}
        </Alert>
    );
};