"use client"

import Logo from "@/components/Navigation/Logo";
import Skeletons from "@/components/Skeletons";
import StarRating from "@/components/StarRating";
import PageTitle from "@/components/Typography/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/UserAvatar";
import { getFullName } from "@/lib";
import { fakeEndorsementRequest } from "@/lib/fakeData";
import { getEndorsementRequestResponse } from "@/lib/queries";
import { EndorsementFormValues, endorsementSchema } from "@/schemas/zod";
import { EndorsementRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EndorsementRequestPage = ({ params }: { params: { id: number } }) => {
    const t = useTranslations("modals")

    const [isLoading, setIsLoading] = useState(true)
    const [isExpired, setIsExpired] = useState(true)
    const [endorsementRequest, setEndorsementRequest] = useState<EndorsementRequest>();

    useEffect(() => {
        const fetchEndorsementRequest = async () => {
            const response = await getEndorsementRequestResponse(params.id);
            if (response?.status === 410)
                setIsExpired(false)

            let data = response?.data;
            if (!data) {
                data = fakeEndorsementRequest;
            }

            setEndorsementRequest(data);
            setIsLoading(false);
        };

        fetchEndorsementRequest();
    }, [params.id]);

    const form = useForm<EndorsementFormValues>({
        resolver: zodResolver(endorsementSchema),
        defaultValues: {
            requestTitle: "",
            supervisorName: "",
            supervisorPosition: "",
            supervisorCompany: "",
            rating: 0,
            feedback: "",
        },
    })

    const onSubmit = (data: EndorsementFormValues) => {
        console.log(data)
        // Here you would typically send the data to your backend
    }

    return <div className="container mx-auto max-w-2xl py-8">
        <Card>
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between w-full">
                    <CardTitle>
                        <PageTitle>{t("endorsementRequest.title")}</PageTitle>
                    </CardTitle>
                    <Logo className="w-fit" />
                </div>
            </CardHeader>
            <CardContent>
                {(isLoading) ? (
                    <>
                        <Skeleton type="profile" />
                        <Skeletons amount={6} wrapperClass="flex flex-col gap-2" className="w-full h-12" />
                    </>
                ) : (
                    (isExpired ? (
                        <div className="text-center">This endorsement request has expired, please ask the student to send a new request.</div>
                    )
                        :
                        (endorsementRequest) && <>
                            <div className="-mt-8 mb-8">Endorse {getFullName(endorsementRequest.requester)}'s skill</div>
                            <div className="mb-6 flex items-center space-x-4">
                                <UserAvatar user={endorsementRequest.requester} />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {endorsementRequest.requester.first_name} {endorsementRequest.requester.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{endorsementRequest.requester.email}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h4 className="text-md font-semibold">Skill Information</h4>
                                <p className="text-sm text-gray-700">{endorsementRequest.skill.title}</p>
                                <p className="text-sm text-gray-500">{endorsementRequest.skill.desc}</p>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="requestTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Request Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="supervisorName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="supervisorPosition"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Position</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="supervisorCompany"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Company</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rating"
                                        render={({ field: { value, onChange } }) => (
                                            <FormItem>
                                                <FormLabel>Skill Rating</FormLabel>
                                                <FormControl>
                                                    <StarRating rating={value} onRatingChange={onChange} allowEdit />
                                                </FormControl>
                                                <FormDescription>Rate the skill from 1 to 4 stars</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="feedback"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feedback</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormDescription>Provide detailed feedback on the student's skill</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Submit Endorsement</Button>
                                </form>
                            </Form>
                        </>
                    ))
                }
            </CardContent>
        </Card>
    </div>
}

export default EndorsementRequestPage
