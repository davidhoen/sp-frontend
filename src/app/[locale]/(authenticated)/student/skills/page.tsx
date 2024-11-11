"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useCompentencies } from "@/hooks/use-compentencies"
import { usePathname, useRouter } from "@/i18n/routing"
import axios from "@/lib/axios"
import { cn } from "@/lib/utils"
import { SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/zod/Pagination"
import { Filter } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SkillsOverview = ({ searchParams }: { searchParams: SkillsQueryType }) => {
    const t = useTranslations("general")
    const pathname = usePathname();
    const { replace } = useRouter();

    const { data: competencies } = useCompentencies()

    const [skills, setSkills] = useState<PagingSchema<SkillType>>();
    const [loading, setLoading] = useState(false);

    const handleCompentencyFilter = useDebouncedCallback((values: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (values.length > 0) {
            params.set('competencies', values.join(",").toString());
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('competencies');
        }
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
    const getSkills = useCallback(async () => {
        setLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""
            const competencies = searchParams.competencies ?? ""
            const isAdded = searchParams.is_added ?? ""

            const { data } = await axios.get<PagingSchema<SkillType>>(`/api/student/skills/?availableCompentencies=true&page=${page}&search=${search}&competencies=${competencies}&is_added=${isAdded}`);
            setSkills(data);
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
        getSkills();
    }, [getSkills, searchParams]);

    const renderSkill = (skill: SkillType) => <SkillCard key={skill.id} skill={skill} />

    return <div className="w-full">
        <PageTitle>{t("skills")}</PageTitle>

        {/* Search */}
        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Compentencies filter*/}
        <div className="my-4 overflow-x-auto no-scrollbar">
            {!!competencies ?
                <ToggleGroup type="multiple" onValueChange={handleCompentencyFilter} defaultValue={searchParams.competencies?.split(',') || "all"}>
                    {competencies?.map((competency) => (<ToggleGroupItem key={competency.value} variant="outline" value={competency.value.toString()}>{competency.label}</ToggleGroupItem>))}
                </ToggleGroup>
                :
                <Skeletons amount={7} wrapperClass="flex" className="w-full h-10" />
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
                <Pager pagerObject={skills} renderItem={renderSkill} emptyMessage={t("noSkillsFound")} wrapperClass="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start" />
                :
                <Skeletons amount={15} className="w-full h-28 mt" />
            }
        </div>
    </div>
}

export default SkillsOverview