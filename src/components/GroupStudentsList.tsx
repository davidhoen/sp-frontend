"use client"

import { useFeedbacks } from "@/hooks/use-feedbacks";
import { feedback } from "@/lib/fakeData";
import { useTranslations } from "next-intl";
import { ContentCard } from "./ContentCard";
import Skeletons from "./Skeletons";
import SectionTitle from "./Typography/SectionTitle";
import { Pager } from "./Pager";
import { FeedbackType } from "@/types";
import AddFeedbackModal from "./Modals/AddFeedbackModal";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { UserType } from "@/types/auth";
import { PagingSchema } from "@/types/pagination";
import { useSearchParams } from "next/navigation";

export function GroupStudentsList({ groupId }: { groupId: string }) {
    const t = useTranslations("general")
    const searchParams = useSearchParams();

    const [students, setStudents] = useState<PagingSchema<UserType>>();
    const [isLoading, setIsLoading] = useState(false);

    //Method to get the groups for the current page
    const fetchGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const page = searchParams.page || "1";

            const filteredGroups = await getGroups({ query: { page, search, is_archived } })
            filteredGroups?.data.map(group => ({ name: group.name, skills: group.skills, numberOfStudents: group.students?.length }));
            setStudents(filteredGroups);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    const handleIsArchived = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('is_archived', value);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('is_archived');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        //Get the groups on page mount and the search term changes
        fetchGroups();
    }, [fetchGroups, searchParams]);

    const tableHeaders = [t("name"), t("skills"), t("students"), t("actions")]
    const renderGroupRow = (group: GroupType) => <GroupRow key={group.id} group={group} />

    return <>
        {/* Title */}
        <SectionTitle numberOfItems={feedbacks?.data?.length}>{t("students")}</SectionTitle>

        {!!feedbacks ?
            <Pager pagerObject={feedbacks} renderItem={renderFeedbacks} emptyMessage={t("noEntitiesFound", { entities: t("feedbacks").toLowerCase() })} wrapperClass="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 items-start" entityKey="feedbacks" />
            :
            <Skeletons amount={4} className="w-full h-36" />
        }
    </>
}
