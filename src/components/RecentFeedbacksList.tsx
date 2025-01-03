"use client"

import { FeedbackType } from "@/types";
import { PagingSchema } from "@/types/pagination";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import { Pager } from "./Pager";
import SectionTitle from "./Typography/SectionTitle";

export function RecentFeedbacksList({ feedbacks, loading }: { feedbacks: PagingSchema<FeedbackType> | undefined, loading: boolean }) {
    const t = useTranslations("general")

    const renderFeedback = (feedback: FeedbackType) => <ContentCard key={feedback.id} content={feedback} />

    return <>
        {/* Title */}
        <SectionTitle numberOfItems={feedbacks?.data?.length}>{t("recentFeedbacks")}</SectionTitle>

        <Pager
            pagerObject={feedbacks}
            renderItem={renderFeedback}
            loading={loading}
            emptyMessage={t("noEntitiesFound", { entities: t("feedbacks").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start"
            entityKey="feedbacks"
        />
    </>

}
