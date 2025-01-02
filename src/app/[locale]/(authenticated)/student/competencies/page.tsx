"use client"

import CompetenciesCard from "@/components/CompetenciesCard"
import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { getCompetencies } from "@/lib/queries/client/queries"
import { CompetencyType, SkillsQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const CompetenciesOverview = (props: { searchParams: Promise<SkillsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")

    const [competencies, setCompetencies] = useState<PagingSchema<CompetencyType>>();
    const [loading, setLoading] = useState(true);

    //Method to get the competencies for the current page
    const fetchCompetencies = useCallback(async () => {
        setLoading(true);
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
            setLoading(false);
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