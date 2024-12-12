"use client"

import { useFeedbacks } from "@/hooks/use-feedbacks";
import { feedback } from "@/lib/fakeData";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import { Pager } from "./Pager";
import { FeedbackType } from "@/types";

export function FeedbacksList({ skillId }: { skillId: string }) {
    let { data: feedbacks, isLoading } = useFeedbacks(skillId)
    const t = useTranslations("general")

    const renderFeedbacks = (feedback: FeedbackType) => <ContentCard key={feedback.id} content={feedback} />

    return <>
        <SectionTitle numberOfItems={feedbacks?.data?.length}>{t("feedback")}</SectionTitle>
        {!!feedbacks ?
            <Pager pagerObject={feedbacks} renderItem={renderFeedbacks} emptyMessage={t("noEntitiesFound", { entities: t("feedbacks").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 items-start" entityKey="feedback" />
            :
            <Skeletons amount={3} className="w-full h-36" />
        }
    </>
}
