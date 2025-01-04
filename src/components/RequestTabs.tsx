"use client"

import { usePathname } from "@/i18n/routing";
import { Tabs, TabsLinkTrigger, TabsList } from "./ui/tabs";
import { useTranslations } from "next-intl";

export const SettingsTabs = () => {
    const path = usePathname();
    const t = useTranslations("general");

    return (
        <Tabs value={path}>
            <TabsList>
                <TabsLinkTrigger href="/teacher/requests/feedbacks/">{t("feedbacks")}</TabsLinkTrigger>
                <TabsLinkTrigger href="/teacher/requests/endorsements/">{t("endorsements")}</TabsLinkTrigger>
            </TabsList>
        </Tabs>
    );
};