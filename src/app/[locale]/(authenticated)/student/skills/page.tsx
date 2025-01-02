"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { getSkills } from "@/lib/queries/client/queries"
import { CompetencyType, SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const SkillsOverview = (props: { searchParams: Promise<SkillsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")
    const [competencies, setCompentencies] = useState<CompetencyType[]>();
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.competencies?.split(',') || ["all"]);


    const onAddedChange = useQueryFilter({ key: 'is_added', removeOnAll: true });
    const onCompetenciesChange = useQueryFilter({
        key: 'competencies',
        type: 'array',
        setValue: setCompetencyFilterValue
    });

    const { data: skills, loading, fetchData } = useFetchData<PagingSchema<SkillType>>();

    const fetchSkills = useCallback(() => {
        fetchData(getSkills, {
            onSuccess: (data) => setCompentencies(data?.meta?.competencies)
        });
    }, [fetchData]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const renderSkill = (skill: SkillType) => <SkillCard key={skill.id} skill={skill} mutate={fetchSkills} />

    return <div className="w-full">
        <PageTitle information={t("definitions.skills")}>{t("skills")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Compentencies filter*/}
        <div className="my-4 overflow-x-auto no-scrollbar">
            {!!competencies ?
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={onCompetenciesChange}>
                    <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("competencies").toLowerCase() })}</ToggleGroupItem>
                    {competencies?.map((competency) => (<ToggleGroupItem key={competency.id} variant="outline" value={competency.id}>{competency.title}</ToggleGroupItem>))}
                </ToggleGroup>
                :
                <Skeletons amount={7} wrapperClass="flex gap-4" className="h-10 w-full" />
            }
        </div>

        {/* Is added filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_added?.toString() || "all"} onValueChange={onAddedChange}>
                <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("skills").toLowerCase() })}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("addedSkills")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="false">{t("notAdded")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <Pager
            pagerObject={skills}
            renderItem={renderSkill} loading={loading}
            emptyMessage={t("noEntitiesFound", { entities: t("skills").toLowerCase() })}
            wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 items-start w-full"
        />

    </div>
}

export default SkillsOverview