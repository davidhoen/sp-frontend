"use client"

import { useEndorsements } from "@/hooks/use-endorsements";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import { endorsement } from "@/lib/fakeData";

export function EndorsementsList({ skillId }: { skillId: string }) {
    let { data: endorsements, isLoading } = useEndorsements(skillId)
    const t = useTranslations("general")

    if (!endorsements?.length)
        endorsements = [endorsement, endorsement]

    return <>
        <SectionTitle numberOfItems={endorsements?.length}>{t("endorsements")}</SectionTitle>
        {isLoading && <Skeletons amount={3} className="w-full h-36" />}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
            {(!isLoading && endorsements) && endorsements.map((endorsement) => <ContentCard key={endorsement.id} content={endorsement} />)}
        </div>
    </>
}
