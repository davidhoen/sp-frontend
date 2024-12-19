"use client"

import { useEndorsements } from "@/hooks/use-endorsements";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import RequestEndorsementModal from "./Modals/RequestEndorsementModal";
import { Button } from "./ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { Pager } from "./Pager";
import { EndorsementType } from "@/types";
import { useRecentEndorsements } from "@/hooks/use-recent-endorsements";

export function RecentEndorsementsList({ competencyId }: { competencyId: string }) {
    let { data: endorsements, isLoading } = useRecentEndorsements(competencyId)
    const t = useTranslations("general")

    const renderEndorsments = (endorsement: EndorsementType) => <ContentCard key={endorsement.id} content={endorsement} />

    return <>
        {/* Title */}
        <SectionTitle numberOfItems={endorsements?.data?.length}>{t("recentEndorsements")}</SectionTitle>

        {!!endorsements ?
            <Pager pagerObject={endorsements} renderItem={renderEndorsments} emptyMessage={t("noEntitiesFound", { entities: t("endorsements").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start" entityKey="endorsements" />
            :
            <Skeletons amount={4} className="w-full h-36" />
        }
    </>

}
