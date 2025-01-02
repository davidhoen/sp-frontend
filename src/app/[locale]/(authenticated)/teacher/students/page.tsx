"use client"

import { Pager } from "@/components/Pager"
import StudentRow from "@/components/Rows/StudentRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { getStudents } from "@/lib/queries/client/queries"
import { StudentsQueryType, UserWithSkillsAndGroups } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const StudentsOverview = (props: { searchParams: Promise<StudentsQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general");

    const [students, setStudents] = useState<PagingSchema<UserWithSkillsAndGroups>>();
    const [loading, setLoading] = useState(true);

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
        <PageTitle>{t("students")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        <Pager
            pagerObject={students}
            renderItem={renderStudentRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("students").toLowerCase() })}
            renderAsTable
        />

    </div>
}

export default StudentsOverview