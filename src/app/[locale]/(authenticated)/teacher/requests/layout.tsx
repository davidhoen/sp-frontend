import { SettingsTabs } from "@/components/RequestTabs";
import PageTitle from "@/components/Typography/PageTitle";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

const RequestsLayout = async ({ children }: { children: ReactNode }) => {
    const t = await getTranslations("general")
    return (
        <>
            <PageTitle className="mb-4">{t("requests")}</PageTitle>
            <SettingsTabs />
            {children}
        </>
    );
};

export default RequestsLayout
