"use client"

import { usePathname } from "@/i18n/routing";
import { BadgeCheckIcon, MessageCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import TabsWithBadge from "./TabsWithBadge";
import { useTeacherRequestsCount } from "@/hooks/use-teacher-requests-count";

export const SettingsTabs = () => {
    const path = usePathname();
    const t = useTranslations("general");

    const { data: requests } = useTeacherRequestsCount()

    const tabs = [
        { href: "/teacher/requests/feedbacks/", title: t("feedbacks"), icon: <MessageCircleIcon size={16} />, badge: Array.isArray(requests) ? 0 : requests?.feedback_requests_count || 0 },
        { href: "/teacher/requests/endorsements/", title: t("endorsements"), icon: <BadgeCheckIcon size={16} />, badge: Array.isArray(requests) ? 0 : requests?.endorsement_requests_count || 0 },
    ];

    return <TabsWithBadge defaultValue={path} tabs={tabs} />
};