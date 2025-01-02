"use client"

import UpsertSkillModal from "@/components/Modals/Teacher/UpsertSkillModal"
import { Pager } from "@/components/Pager"
import SkillRow from "@/components/Rows/SkillRow"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { usePathname, useRouter } from "@/i18n/routing"
import { getSkills, getTeacherSkills } from "@/lib/queries/client/queries"
import { CompetencyType, SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SkillsOverview = (props: { searchParams: Promise<SkillsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const [competencies, setCompentencies] = useState<CompetencyType[]>();
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.competencies?.split(',') || ["all"]);

    const handleFilter = useQueryFilter();

    const onCompetenciesChange = handleFilter({
        key: 'competencies',
        type: 'array',
        setValue: setCompetencyFilterValue
    });

    const { data: skills, loading, fetchData } = useFetchData<PagingSchema<SkillType>>();

    const fetchSkills = useCallback(() => {
        fetchData(getTeacherSkills, {
            transformParams: (params) => ({
                ...params,
                competencies: params.competencies || '',
            }),
            onSuccess: (data) => setCompentencies(data?.meta?.competencies)
        });
    }, [fetchData]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const tableHeaders = [t("skills"), t("competency"), t("groups"), t("actions")]
    const renderSkillRow = (skill: SkillType) => <SkillRow key={skill.id} skill={skill} mutate={fetchSkills} />

    return <div className="w-full">
        <PageTitle information={t("definitions.skills")}>{t("skills")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
            <UpsertSkillModal>
                <Button>{t("addASkill")}</Button>
            </UpsertSkillModal>
        </div>

        {/* Compentencies filter*/}
        <div className="my-4 overflow-x-auto no-scrollbar">
            {!!competencies ?
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={onCompetenciesChange}>
                    <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("competencies").toLowerCase() })}</ToggleGroupItem>
                    {competencies?.map((competency) => competency && (<ToggleGroupItem key={competency.id} variant="outline" value={competency.id}>{competency.title}</ToggleGroupItem>))}
                </ToggleGroup>
                :
                <Skeletons amount={7} wrapperClass="flex gap-4" className="h-10 w-full" />
            }
        </div>

        <Pager
            pagerObject={skills}
            renderItem={renderSkillRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("skills").toLowerCase() })}
            renderAsTable
        />
    </div>
}

export default SkillsOverview