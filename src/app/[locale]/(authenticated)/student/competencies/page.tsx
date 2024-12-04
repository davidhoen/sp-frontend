"use client"

import CompetenciesCard from "@/components/CompetenciesCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { getCompetencies } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { CompetencyType, SkillsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"

const CompetenciesOverview = ({ searchParams }: { searchParams: SkillsQueryType }) => {
    const t = useTranslations("general")

    const [competencies, setCompetencies] = useState<PagingSchema<CompetencyType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the competencies for the current page
    const fetchCompetencies = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""

            const filteredCompetencies = await getCompetencies({ page, search });

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

    const renderCompetencies = (competency: CompetencyType) => <CompetenciesCard key={competency.id} competency={competency} />

    return <div className="w-full">
        <PageTitle information={t("definitions.competencies")}>{t("competencies")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        <div className={cn("transition-all duration-500", isLoading ? "blur-md cursor-wait" : "blur-0")}>
            {!!competencies ?
                <Pager pagerObject={competencies} renderItem={renderCompetencies} emptyMessage={t("noEntitiesFound", { entities: t("competencies").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start" />
                :
                <Skeletons amount={15} className="w-full h-28" />
            }
        </div>
    </div>
}

export default CompetenciesOverview