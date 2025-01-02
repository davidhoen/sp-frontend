"use client"

import UpsertProfileModal from "@/components/Modals/Teacher/UpsertProfileModal"
import { Pager } from "@/components/Pager"
import ProfileRow from "@/components/Rows/ProfileRow"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { getTeacherProfiles } from "@/lib/queries/client/queries"
import { ProfileWithCompetencies, TeacherProfileQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const ProfilesOverview = (props: { searchParams: Promise<TeacherProfileQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")

    const [profiles, setProfiles] = useState<PagingSchema<ProfileWithCompetencies>>();
    const [loading, setLoading] = useState(false);

    //Method to get the profiles for the current page
    const fetchProfiles = useCallback(async () => {
        setLoading(true);
        try {
            const page = searchParams.page || "1";

            const filteredProfiles = await getTeacherProfiles({ query: { page } })
            setProfiles(filteredProfiles);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        //Get the profiles on page mount and the search term changes
        fetchProfiles();
    }, [fetchProfiles, searchParams]);

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