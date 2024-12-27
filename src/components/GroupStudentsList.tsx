"use client"

import { usePathname, useRouter } from "@/i18n/routing";
import { getGroupStudents } from "@/lib/queries/client/queries";
import { GroupType, UserWithSkills } from "@/types";
import { PagingSchema } from "@/types/pagination";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Pager } from "./Pager";
import GroupStudentRow from "./Rows/GroupStudentRow";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function GroupStudentsList({ group }: { group: GroupType }) {
    const t = useTranslations("general")
    const searchParams = useSearchParams();
    const { replace } = useRouter()
    const pathname = usePathname();

    const [students, setStudents] = useState<PagingSchema<UserWithSkills>>();
    const [isLoading, setIsLoading] = useState(false);
    const [competencyFilterValue, setCompetencyFilterValue] = useState(searchParams.get("skills")?.split(',') || ["all"]);


    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.get("page") || "1";
            const skills = searchParams.get("skills") || "";
            const filteredStudents = await getGroupStudents({ groupId: group.id, query: { page, skills } })
            setStudents(filteredStudents);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    const handleSkillsFilter = useDebouncedCallback((values: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (values.length > 0) {
            let filterValues = values;
            const newestValue = values[values.length - 1];

            // When all is selected, remove all other values and reset the skills parameter
            if (newestValue === "all") {
                filterValues = ["all"];
                params.delete('skills');
            }
            else {
                // When a different value is selected, remove all and add the selected value
                filterValues = values.filter((value) => value !== "all")
                params.set('skills', filterValues.join(",").toString());
            }

            setCompetencyFilterValue(filterValues);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        }
        else
            // Remove skills parameter when no skills are selected
            params.delete('skills');

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchGroups();
    }, [fetchGroups, searchParams]);

    const tableHeaders = [t("student"), t("skills"), t("actions")]
    const renderGroupStudentRow = (student: UserWithSkills) => <GroupStudentRow key={student.id} group={group} student={student} mutate={fetchGroups} />

    return <>
        <SectionTitle>{t("skills")}</SectionTitle>
        <div className="flex gap-2 my-4 overflow-x-auto no-scrollbar mb-6">
            {!!group?.skills &&
                <ToggleGroup type="multiple" value={competencyFilterValue} onValueChange={handleSkillsFilter}>
                    <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("skills").toLowerCase() })}</ToggleGroupItem>
                    {group?.skills?.map((skill) => (<ToggleGroupItem key={skill.id} variant="outline" value={skill.id}>{skill.title}</ToggleGroupItem>))}
                </ToggleGroup>
            }
        </div>

        {/* Title */}
        <SectionTitle numberOfItems={students?.data?.length}>{t("students")}</SectionTitle>
        {!!students ?
            <Pager pagerObject={students} headerItems={tableHeaders} renderItem={renderGroupStudentRow} emptyMessage={t("noEntitiesFound", { entities: t("students").toLowerCase() })} renderAsTable />
            :
            <Skeletons amount={15} className="w-full h-14" wrapperClass="grid gap-2" />
        }
    </>
}
