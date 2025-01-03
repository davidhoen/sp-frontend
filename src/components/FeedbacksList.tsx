"use client"

import { useFeedbacks } from "@/hooks/use-feedbacks";
import { feedback } from "@/lib/fakeData";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import { Pager } from "./Pager";
import { FeedbackType } from "@/types";
import AddFeedbackModal from "./Modals/AddFeedbackModal";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

export function FeedbacksList({ skillId }: { skillId: string }) {
    let { data: feedbacks, isLoading } = useFeedbacks(skillId)
    const t = useTranslations("general")

    const renderFeedbacks = (feedback: FeedbackType) => <ContentCard key={feedback.id} content={feedback} />

    return <>
        {/* Title and add button */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            {/* Title */}
            <SectionTitle numberOfItems={feedbacks?.data?.length}>{t("feedback")}</SectionTitle>
            {/* Request and add feedback buttons */}
            <div className="flex gap-2 flex-wrap mb-4">
                <AddFeedbackModal skillId={skillId} >
                    <Button variant="outline" size="sm" className="w-full sm:w-fit">
                        <PlusIcon size={16} />
                        {t("addFeedback")}
                    </Button>
                </AddFeedbackModal>
            </div>
        </div>

        <Pager
            pagerObject={feedbacks}
            renderItem={renderFeedbacks}
            loading={isLoading}
            emptyMessage={t("noEntitiesFound", { entities: t("feedbacks").toLowerCase() })}
            wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start"
            entityKey="feedbacks"
        />
    </>
}
