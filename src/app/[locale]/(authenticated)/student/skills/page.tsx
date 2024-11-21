"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useCompentencies } from "@/hooks/use-compentencies"
import { usePathname, useRouter } from "@/i18n/routing"
import { getSkills } from "@/lib/queries"
import { cn } from "@/lib/utils"
import { CompetencyType, SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SkillsOverview = ({ searchParams }: { searchParams: SkillsQueryType }) => {
    const t = useTranslations("general")
    const pathname = usePathname();
    const { replace } = useRouter();

    const [skills, setSkills] = useState<PagingSchema<SkillType>>();
    const [compentencies, setCompentencies] = useState<CompetencyType[]>();
    const [loading, setLoading] = useState(false);
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.competencies?.split(',') || ["all"]);

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

    const handleIsAddedFilter = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set('is_added', value);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('is_added');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    //Method to get the skills for the current page
    const fetchSkills = useCallback(async () => {
        setLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""
            const competencies = searchParams.competencies ?? ""
            const isAdded = searchParams.is_added ?? undefined

            const filteredSkills = await getSkills({ page, search, competencies, isAdded });

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
        //Get the skills on page mount and when a filter value changes
        fetchSkills();
    }, [fetchSkills, searchParams]);

    const renderSkill = (skill: SkillType) => <SkillCard key={skill.id} skill={skill} mutate={fetchSkills} />

    return <div className="w-full">
        <PageTitle>{t("skills")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Compentencies filter*/}
        <div className="my-4 overflow-x-auto no-scrollbar">
            {!!compentencies ?
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={handleCompentencyFilter}>
                    <ToggleGroupItem variant="outline" value="all">{t("allCompetencies")}</ToggleGroupItem>
                    {compentencies?.map((competency) => (<ToggleGroupItem key={competency.id} variant="outline" value={competency.id}>{competency.title}</ToggleGroupItem>))}
                </ToggleGroup>
                :
                <Skeletons amount={7} wrapperClass="flex gap-4" className="h-10 w-full" />
            }
        </div>

        {/* Is added filter */}
        <div className="my-4">
            <ToggleGroup type="single" defaultValue={searchParams.is_added?.toString() || "all"} onValueChange={handleIsAddedFilter}>
                <ToggleGroupItem variant="outline" value="all">{t("allSkills")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="true">{t("addedSkills")}</ToggleGroupItem>
                <ToggleGroupItem variant="outline" value="false">{t("notAdded")}</ToggleGroupItem>
            </ToggleGroup>
        </div>

        <div className={cn("transition-all duration-500", loading ? "blur-md cursor-wait" : "blur-0")}>
            {!!skills ?
                <Pager pagerObject={skills} renderItem={renderSkill} emptyMessage={t("noEntitiesFound", { entities: t("skills").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 items-start" />
                :
                <Skeletons amount={15} className="w-full h-28" />
            }
        </div>
    </div>
}

export default SkillsOverview