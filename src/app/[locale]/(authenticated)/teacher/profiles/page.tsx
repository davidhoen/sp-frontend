"use client"

import UpsertProfileModal from "@/components/Modals/Teacher/UpsertProfileModal"
import { Pager } from "@/components/Pager"
import ProfileRow from "@/components/Rows/ProfileRow"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { useFetchData } from "@/hooks/use-fetch-data"
import { getTeacherProfiles } from "@/lib/queries/client/queries"
import { ProfileWithCompetencies } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const ProfilesOverview = () => {
    const t = useTranslations("general")

    const { data: profiles, loading, fetchData } = useFetchData<PagingSchema<ProfileWithCompetencies>>();

    const fetchProfiles = useCallback(() => {
        fetchData(getTeacherProfiles);
    }, [fetchData]);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles])


    const tableHeaders = [t("title"), t("competencies"), t("actions")]
    const renderProfileRow = (profile: ProfileWithCompetencies) => <ProfileRow key={profile.id} profile={profile} mutate={fetchProfiles} />

    return <div className="w-full">

        <div className="flex justify-between my-4">
            <PageTitle information={t("definitions.profiles")}>{t("profiles")}</PageTitle>

            <UpsertProfileModal mutate={fetchProfiles}>
                <Button>{t("add")}</Button>
            </UpsertProfileModal>
        </div>

        <Pager
            pagerObject={profiles}
            renderItem={renderProfileRow}
            loading={loading}
            headerItems={tableHeaders}
            emptyMessage={t("noEntitiesFound", { entities: t("profiles").toLowerCase() })}
            renderAsTable
        />

    </div>
}

export default ProfilesOverview