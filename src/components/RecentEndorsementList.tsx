"use client"

import { EndorsementType } from "@/types";
import { PagingSchema } from "@/types/pagination";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import { Pager } from "./Pager";
import SectionTitle from "./Typography/SectionTitle";

export function RecentEndorsementsList({ endorsements, loading }: { endorsements: PagingSchema<EndorsementType> | undefined, loading: boolean }) {
    const t = useTranslations("general")

    const renderEndorsments = (endorsement: EndorsementType) => <ContentCard key={endorsement.id} content={endorsement} />

    return <>
        {/* Title */}
        <SectionTitle numberOfItems={endorsements?.data?.length}>{t("recentEndorsements")}</SectionTitle>

        <Pager
            pagerObject={endorsements}
            renderItem={renderEndorsments}
            loading={loading}
            emptyMessage={t("noEntitiesFound", { entities: t("endorsements").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start"
            entityKey="endorsements"
        />
    </>

}
