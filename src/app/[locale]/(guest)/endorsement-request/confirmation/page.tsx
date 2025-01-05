
import Logo from "@/components/Navigation/Logo";
import PageTitle from "@/components/Typography/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const EndorsementRequestConfirmationPage = async () => {
    const t = await getTranslations("modals")

    return <div className="container mx-auto max-w-2xl md:py-8">
        <Card>
            <CardContent className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="mb-6 sm:mb-0 sm:mr-6 text-center sm:text-left">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center">
                                <CheckCircleIcon className="mr-2 h-8 w-8 text-green-400" />
                                <PageTitle className="">{t("endorsementRequest.confirmation.title")}</PageTitle>
                            </CardTitle>
                        </CardHeader>
                        <p className="text-lg mb-4">
                            {t("endorsementRequest.confirmation.description")}
                        </p>
                        <p className="text-muted-foreground mb-4">
                            {t("endorsementRequest.confirmation.body")}
                        </p>
                        <p>{t("endorsementRequest.confirmation.closePage")}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <Logo className="w-fit" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
}

export default EndorsementRequestConfirmationPage
