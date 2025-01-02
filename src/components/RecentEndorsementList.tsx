"use client"

import { useRecentEndorsements } from "@/hooks/use-recent-endorsements";
import { EndorsementType } from "@/types";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import { Pager } from "./Pager";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";

export function RecentEndorsementsList({ competencyId }: { competencyId: string }) {
    let { data: endorsements, isLoading } = useRecentEndorsements(competencyId)
    const t = useTranslations("general")

    const renderEndorsments = (endorsement: EndorsementType) => <ContentCard key={endorsement.id} content={endorsement} />

    return <>
        {/* Title */}
        <SectionTitle numberOfItems={endorsements?.data?.length}>{t("recentEndorsements")}</SectionTitle>

        <Pager
            pagerObject={endorsements}
            renderItem={renderEndorsments}
            loading={isLoading}
            emptyMessage={t("noEntitiesFound", { entities: t("endorsements").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start"
            entityKey="endorsements"
        />
    </>

}
