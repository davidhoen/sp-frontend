"use client"

import UpsertCompetencyModal from "@/components/Modals/Teacher/UpsertCompetencyModal"
import { Pager } from "@/components/Pager"
import CompetencyRow from "@/components/Rows/CompetencyRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
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

    const tableHeaders = [t("competency"), t("skills"), t("profiles"), t("actions")]
    const renderGroupRow = (competency: CompetencyType) => <CompetencyRow key={competency.id} competency={competency} mutate={fetchCompetencies} />

    return <div className="w-full">
        <PageTitle information={t("definitions.competencies")}>{t("competencies")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
            <UpsertCompetencyModal mutate={fetchCompetencies}>
                <Button>{t("add")}</Button>
            </UpsertCompetencyModal>
        </div>

        <Pager
            pagerObject={competencies}
            renderItem={renderGroupRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("competencies").toLowerCase() })}
            renderAsTable
        />

    </div>
}

export default CompetenciesOverview