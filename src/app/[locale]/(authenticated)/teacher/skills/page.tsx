"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePathname, useRouter, Link } from "@/i18n/routing"
import { getTeacherSkills } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { CompetencyType, SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const SkillsOverview = ({ searchParams }: { searchParams: SkillsQueryType }) => {
    const t = useTranslations("general");
    const pathname = usePathname();
    const { replace } = useRouter();

    const [skills, setSkills] = useState<PagingSchema<SkillType>>();
    const [competencies, setCompentencies] = useState<CompetencyType[]>();
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.competencies?.split(',') || ["all"]);
    const [Loading, setLoading] = useState(false);

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
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""
            const competencies = searchParams.competencies ?? ""

            const filteredSkills = await getTeacherSkills({ page, search, competencies });

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
        //Get the groups on page mount and the search term changes
        fetchSkills();
    }, [fetchSkills, searchParams]);

    const renderSkill = (skill: SkillType) => <SkillCard key={skill.id} skill={skill} />

    return <div className="w-full">
        <PageTitle information={t("definitions.skills")}>{t("skills")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Compentencies filter*/}
        <div className="my-4 overflow-x-auto no-scrollbar">
            {!!competencies ?
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={handleCompentencyFilter}>
                    <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("competencies").toLowerCase() })}</ToggleGroupItem>
                    {competencies?.map((competency) => (<ToggleGroupItem key={competency.id} variant="outline" value={competency.id}>{competency.title}</ToggleGroupItem>))}
                </ToggleGroup>
                :
                <Skeletons amount={7} wrapperClass="flex gap-4" className="h-10 w-full" />
            }
        </div>

        {/* Action buttons (add skill) */}
        <div className="my-4">
        <Link href={{ pathname: `/teacher/`, query: "is_added=false" }}>
            <Button className="rounded-full"><PlusIcon size={16} />{t("addASkill")}</Button>
        </Link>
        </div>
        
        <div className={cn("transition-all duration-500", Loading ? "blur-md cursor-wait" : "blur-0")}>
                   {!!skills ?
                       <Pager pagerObject={skills} renderItem={renderSkill} emptyMessage={t("noEntitiesFound", { entities: t("skills").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start" />
                       :
                       <Skeletons amount={15} className="w-full h-28" />
                   }
        </div>
    </div>
}

export default SkillsOverview