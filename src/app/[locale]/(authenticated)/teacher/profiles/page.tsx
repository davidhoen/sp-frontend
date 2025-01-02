"use client"

import UpsertProfileModal from "@/components/Modals/Teacher/UpsertProfileModal"
import { Pager } from "@/components/Pager"
import ProfileRow from "@/components/Rows/ProfileRow"
import Skeletons from "@/components/Skeletons"
import PageTitle from "@/components/Typography/PageTitle"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/routing"
import { getTeacherProfiles } from "@/lib/queries/client/queries"
import { cn } from "@/lib/utils"
import { ProfileWithCompetencies, TeacherProfileQueryType } from "@/types"
import { PagingSchema } from "@/types/pagination"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect, useState } from "react"

const ProfilesOverview = (props: { searchParams: Promise<TeacherProfileQueryType> }) => {
    const searchParams = use(props.searchParams);
    const t = useTranslations("general")
    const { replace } = useRouter()
    const pathname = usePathname();

    const [profiles, setProfiles] = useState<PagingSchema<ProfileWithCompetencies>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the profiles for the current page
    const fetchProfiles = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.page || "1";

            const filteredProfiles = await getTeacherProfiles({ query: { page } })
            setProfiles(filteredProfiles);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
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

        <div className={cn("transition-all duration-500", isLoading ? "blur-md cursor-wait" : "blur-0")}>
            {!!profiles ?
                <Pager pagerObject={profiles} renderItem={renderProfileRow} headerItems={tableHeaders} emptyMessage={t("noEntitiesFound", { entities: t("profiles").toLowerCase() })} renderAsTable />
                :
                <Skeletons amount={15} className="w-full h-14" wrapperClass="grid gap-2" />
            }
        </div>
    </div>
}

export default ProfilesOverview