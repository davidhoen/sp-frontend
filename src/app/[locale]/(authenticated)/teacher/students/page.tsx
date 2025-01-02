"use client"

import { Pager } from "@/components/Pager"
import StudentRow from "@/components/Rows/StudentRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { useFetchData } from "@/hooks/use-fetch-data"
import { getStudents } from "@/lib/queries/client/queries"
import { UserWithSkillsAndGroups } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const StudentsOverview = () => {
    const t = useTranslations("general");

    const { data: students, loading, fetchData } = useFetchData<PagingSchema<UserWithSkillsAndGroups>>();

    const fetchStudents = useCallback(() => {
        fetchData(getStudents);
    }, [fetchData]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents])

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