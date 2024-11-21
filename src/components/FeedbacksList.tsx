"use client"

import { useFeedbacks } from "@/hooks/use-feedbacks";
import { feedback } from "@/lib/fakeData";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";

export function FeedbacksList({ skillId }: { skillId: string }) {
    let { data: feedbacks, isLoading } = useFeedbacks(skillId)
    const t = useTranslations("general")

    if (!feedbacks?.length)
        feedbacks = [feedback, feedback, feedback]

    return <>
        <SectionTitle numberOfItems={feedbacks?.length}>{t("feedback")}</SectionTitle>
        {isLoading && <Skeletons amount={3} className="w-full h-36" />}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
            {(!isLoading && feedbacks) && feedbacks.map((feedback) => <ContentCard key={feedback.id} content={feedback} />)}
        </div>
    </>
}
