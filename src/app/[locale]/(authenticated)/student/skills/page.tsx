"use client"

import { Pager } from "@/components/Pager"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import SkillCard from "@/components/SkillCard"
import PageTitle from "@/components/Typography/PageTitle"
import axios from "@/lib/axios"
import { cn } from "@/lib/utils"
import { SkillsQueryType, SkillType } from "@/types"
import { PagingSchema } from "@/zod/Pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"

const SkillsOverview = ({ searchParams }: { searchParams: SkillsQueryType }) => {
    const t = useTranslations("general")

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [skills, setSkills] = useState<PagingSchema<SkillType>>();
    const [loading, setLoading] = useState(false);
    const [isAdded, setIsAdded] = useState<boolean | undefined>();
    const [compentencyIds, setCompentencyIds] = useState<string[]>([]);

    //Method to get the skills for the current page
    const getSkills = useCallback(async () => {
        setLoading(true);
        try {
            const page = parseInt(searchParams.page) || 1;
            const search = searchParams.search ?? ""

            const { data } = await axios.get<PagingSchema<SkillType>>(`/api/student/skills/?page=${page}&search=${search}&competencies=${compentencyIds}&is_added=${isAdded}`);
            setSkills(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [pageNumber, searchParams]);

    useEffect(() => {
        //Get the skills on page mount and when a filter value changes
        getSkills();
    }, [getSkills, searchParams]);

    const renderSkill = (skill: SkillType) => <SkillCard key={skill.id} skill={skill} />

    return <div>
        <PageTitle>{t("skills")}</PageTitle>

        <div className="my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        <div className={cn("transition-all duration-500", loading ? "blur-md cursor-wait" : "blur-0")}>
            {!!skills ?
                <Pager pagerObject={skills} renderItem={renderSkill} emptyMessage="No skills found" wrapperClass="grid md:grid-cols-2 gap-8 items-start" />
                :
                <Skeletons amount={10} className="w-full h-28 " />
            }
        </div>
    </div>
}

export default SkillsOverview