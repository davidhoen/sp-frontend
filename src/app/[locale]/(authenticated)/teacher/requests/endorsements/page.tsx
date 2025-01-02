"use client"

import { Pager } from "@/components/Pager"
import StudentRow from "@/components/Rows/StudentRow"
import SearchInput from "@/components/SearchInput"
import Skeletons from "@/components/Skeletons"
import { getStudents } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { StudentsQueryType, UserWithSkillsAndGroups } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const EndorsementRequests = (props: { searchParams: Promise<StudentsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const [students, setStudents] = useState<PagingSchema<UserWithSkillsAndGroups>>();
    const [loading, setLoading] = useState(false);

    //Method to get the students for the current page
    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.page || "1";
            const search = searchParams.search ?? ""

            const filteredSkills = await getStudents({ query: { page, search } });
            setStudents(filteredSkills);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the students on page mount and the search term changes
        fetchStudents();
    }, [fetchStudents, searchParams]);

    const tableHeaders = [t("name"), t("skills"), t("groups"), t("actions")]
    const renderStudentRow = (student: UserWithSkillsAndGroups) => <StudentRow key={student.id} student={student} mutate={fetchStudents} />

    return <div className="w-full">

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        <div className={cn("transition-all duration-500", loading ? "blur-md cursor-wait" : "blur-0")}>
            {!!students ?
                <Pager pagerObject={students} renderItem={renderStudentRow} headerItems={tableHeaders} emptyMessage={t("noEntitiesFound", { entities: t("students").toLowerCase() })} renderAsTable />
                :
                <Skeletons amount={15} className="w-full h-14" wrapperClass="grid gap-2" />
            }
        </div>
    </div>
}

export default EndorsementRequests