
import { EndorsementRequestForm } from "@/components/Forms/EndorsementRequestForm";
import Logo from "@/components/Navigation/Logo";
import PageTitle from "@/components/Typography/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import { getFullName } from "@/lib";
import { fakeEndorsementRequest } from "@/lib/fakeData";
import { getEndorsementRequestResponse } from "@/lib/queries/server/queries";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const EndorsementRequestPage = async ({ params }: { params: { id: number } }) => {
    const t = await getTranslations("modals")

    const endorsementRequest = await getEndorsementRequestResponse(params.id) ?? fakeEndorsementRequest

    if (!endorsementRequest)
        notFound()

    return <div className="container mx-auto max-w-2xl md:py-8">
        <Card>
            <CardHeader className="space-y-1">
                <div className="flex flex-col-reverse md:flex-row gap-6 md:items-center justify-between w-full mb-6 md:mb-0">
                    <CardTitle>
                        <PageTitle>{t("endorsementRequest.title")}</PageTitle>
                    </CardTitle>
                    <Logo className="w-fit" />
                </div>
            </CardHeader>
            <CardContent>
                {(endorsementRequest === "expired") ?
                    <div className="text-center">{t("endorsementRequest.requestExpired")}</div>
                    :
                    <>
                        <div className="-mt-8 mb-8">{t("endorsementRequest.endorseUserSkill", { name: getFullName(endorsementRequest.requester) })}</div>
                        <div className="mb-6 flex items-center space-x-4">
                            <UserAvatar user={endorsementRequest.requester} />
                            <div>
                                <h3 className="text-lg font-semibold">{getFullName(endorsementRequest.requester)}</h3>
                                <p className="text-sm text-gray-500">{endorsementRequest.requester.email}</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h4 className="text-md font-semibold">{t("endorsementRequest.skillInformation")}</h4>
                            <p className="text-sm text-gray-700">{endorsementRequest.skill.title}</p>
                            <p className="text-sm text-gray-500">{endorsementRequest.skill.desc}</p>
                        </div>
                        {/* Form */}
                        <EndorsementRequestForm endorsementRequest={endorsementRequest} />
                    </>
                }
            </CardContent>
        </Card>
    </div>
}

export default EndorsementRequestPage
