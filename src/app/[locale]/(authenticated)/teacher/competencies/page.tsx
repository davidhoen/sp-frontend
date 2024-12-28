"use client"

import UpsertCompetencyModal from "@/components/Modals/Teacher/UpsertCompetencyModal"
import { Pager } from "@/components/Pager"
import CompetencyRow from "@/components/Rows/CompetencyRow"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { getCompetencies } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { CompetencyType, TeacherGroupsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const CompetenciesOverview = (props: { searchParams: Promise<TeacherGroupsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")

    const [competencies, setCompetencies] = useState<PagingSchema<CompetencyType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the competencies for the current page
    const fetchCompetencies = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""

            const filteredCompetencies = await getCompetencies({ query: { page, search } });

            setCompetencies(filteredCompetencies);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the competencies on page mount and the search term changes
        fetchCompetencies();
    }, [fetchCompetencies, searchParams]);

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

        <div className={cn("transition-all duration-500", isLoading ? "blur-md cursor-wait" : "blur-0")}>
            {!!competencies ?
                <Pager pagerObject={competencies} renderItem={renderGroupRow} headerItems={tableHeaders} emptyMessage={t("noEntitiesFound", { entities: t("competencies").toLowerCase() })} renderAsTable />
                :
                <Skeletons amount={15} className="w-full h-14" wrapperClass="grid gap-2" />
            }
        </div>
    </div>
}

export default CompetenciesOverview