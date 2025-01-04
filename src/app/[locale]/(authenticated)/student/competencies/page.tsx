"use client"

import CompetenciesCard from "@/components/CompetenciesCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { useFetchData } from "@/hooks/use-fetch-data"
import { getCompetencies } from "@/lib/queries/client/queries"
import { CompetencyType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const CompetenciesOverview = () => {
    const t = useTranslations("general")

    const { data: competencies, loading, fetchData } = useFetchData<PagingSchema<CompetencyType>>();

    const fetchCompetencies = useCallback(() => {
        fetchData(getCompetencies);
    }, [fetchData]);

    useEffect(() => {
        fetchCompetencies();
    }, [fetchCompetencies])

    const renderCompetencies = (competency: CompetencyType) => <CompetenciesCard key={competency.id} competency={competency} />

    return <div className="w-full">
        <PageTitle information={t("definitions.competencies")}>{t("competencies")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        <Pager
            pagerObject={competencies}
            renderItem={renderCompetencies}
            loading={loading}
            emptyMessage={t("noEntitiesFound", { entities: t("competencies").toLowerCase() })}
            wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch w-full"
        />

    </div>
}

export default CompetenciesOverview