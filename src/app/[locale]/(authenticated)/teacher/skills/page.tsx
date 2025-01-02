"use client"

import UpsertSkillModal from "@/components/Modals/Teacher/UpsertSkillModal"
import { Pager } from "@/components/Pager"
import SkillRow from "@/components/Rows/SkillRow"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePathname, useRouter } from "@/i18n/routing"
import { getTeacherSkills } from "@/lib/queries/client/queries"
import { CompetencyType, SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SkillsOverview = (props: { searchParams: Promise<SkillsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");
    const pathname = usePathname();
    const { replace } = useRouter();

    const [skills, setSkills] = useState<PagingSchema<SkillType>>();
    const [competencies, setCompentencies] = useState<CompetencyType[]>();
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.competencies?.split(',') || ["all"]);
    const [loading, setLoading] = useState(true);

    const handleCompentencyFilter = useDebouncedCallback((values: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (values.length > 0) {
            let filterValues = values;
            const newestValue = values[values.length - 1];

            // When all is selected, remove all other values and reset the competencies parameter
            if (newestValue === "all") {
                filterValues = ["all"];
                params.delete('competencies');
            }
            else {
                // When a different value is selected, remove all and add the selected value
                filterValues = values.filter((value) => value !== "all")
                params.set('competencies', filterValues.join(",").toString());
            }

            setCompetencyFilterValue(filterValues);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        }
        else
            // Remove competencies parameter when no competencies are selected
            params.delete('competencies');

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    //Method to get the skills for the current page
    const fetchSkills = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""
            const competencies = searchParams.competencies ?? ""

            const filteredSkills = await getTeacherSkills({ query: { page, search, competencies } });
            filteredSkills?.data.map(skills => ({ skills: skills, competencies: skills.competency, numberOfGroup: skills.groups_count }))
            setSkills(filteredSkills);
            setCompentencies(filteredSkills?.meta?.competencies);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the skills on page mount and the search term changes
        fetchSkills();
    }, [fetchSkills, searchParams]);

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
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={handleCompentencyFilter}>
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