"use client"

import { Pager } from "@/components/Pager"
import UserRow from "@/components/Rows/UserRow"
import SearchInput from "@/components/SearchInput"
import PageTitle from "@/components/Typography/PageTitle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useFetchData } from "@/hooks/use-fetch-data"
import { useQueryFilter } from "@/hooks/use-query-filter"
import { useRoles } from "@/hooks/use-roles"
import { getStudents } from "@/lib/queries/client/queries"
import { UserType } from "@/types/auth"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const UsersOverview = () => {
    const t = useTranslations("general");
    const searchParams = useSearchParams()

    const [roleFilterValue, setRoleFilterValue] = useState(searchParams.get("roles")?.split(',') || ["all"]);

    const { data: users, loading, fetchData } = useFetchData<PagingSchema<UserType>>();
    const { data: roles } = useRoles()

    const onRoleChange = useQueryFilter({
        key: 'roles',
        type: 'array',
        setValue: setRoleFilterValue
    });

    const fetchUsers = useCallback(() => {
        // TODO: Use get users method
        fetchData(getStudents);
    }, [fetchData]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    const tableHeaders = [t("name"), t("email"), t("role"), t("actions")]
    const renderUserRow = (user: UserType) => <UserRow key={user.id} user={user} mutate={fetchUsers} roles={roles || []} />

    return <div className="w-full">
        <PageTitle>{t("users")}</PageTitle>

        {/* Search */}
        <div className="flex justify-between my-4">
            <SearchInput placeholder={t("search")} />
        </div>

        {/* Roles filter */}
        <ToggleGroup type="multiple" value={roleFilterValue} onValueChange={onRoleChange}>
            <ToggleGroupItem variant="outline" value="all">{t("allEntities", { entities: t("roles").toLowerCase() })}</ToggleGroupItem>
            {roles?.map((role) => role && (<ToggleGroupItem key={role.value} variant="outline" value={role.value.toString()}>{role.label}</ToggleGroupItem>))}
        </ToggleGroup>

        <Pager
            pagerObject={users}
            renderItem={renderUserRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("users").toLowerCase() })}
            renderAsTable
        />

    </div>
}

export default UsersOverview