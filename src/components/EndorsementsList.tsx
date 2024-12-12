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

export function EndorsementsList({ skillId }: { skillId: string }) {
    let { data: endorsements, isLoading } = useEndorsements(skillId)
    const t = useTranslations("general")

    const renderEndorsments = (endorsement: EndorsementType) => <ContentCard key={endorsement.id} content={endorsement} />

    return <>
        {/* Title and add button */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            {/* Title */}
            <SectionTitle numberOfItems={endorsements?.data?.length}>{t("endorsements")}</SectionTitle>
            {/* Request endorsement button */}
            <RequestEndorsementModal skillId={skillId}>
                <Button variant="outline" className="w-full sm:w-fit" size="sm">
                    <BadgeCheckIcon size={16} />
                    {t("requestEndorsement")}
                </Button>
            </RequestEndorsementModal>
        </div>

        {!!endorsements ?
            <Pager pagerObject={endorsements} renderItem={renderEndorsments} emptyMessage={t("noEntitiesFound", { entities: t("endorsements").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start" entityKey="endorsements" />
            :
            <Skeletons amount={4} className="w-full h-36" />
        }
    </>

}
