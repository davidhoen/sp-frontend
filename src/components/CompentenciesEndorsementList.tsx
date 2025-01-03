"use client"

import { useCompetencyRecentEndorsements } from "@/hooks/use-competency-recent-endorsements"
import { RecentEndorsementsList } from "./RecentEndorsementList"

export function CompentenciesEndorsementList({ competencyId }: { competencyId: string }) {
    let { data: endorsements, isLoading } = useCompetencyRecentEndorsements(competencyId)

    return <RecentEndorsementsList loading={isLoading} endorsements={endorsements} />
}
