"use client"

import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/routing";
import { triggerPromiseToast } from "@/lib";
import axiosInstance from "@/lib/axios";
import { EndorsementFormValues, endorsementSchema } from "@/schemas/zod";
import { EndorsementRequestType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SetCookies from "../SetCookies";

export const EndorsementRequestForm = ({ endorsementRequest }: { endorsementRequest: EndorsementRequestType }) => {
    const t = useTranslations("modals")
    const { push } = useRouter()

    const form = useForm<EndorsementFormValues>({
        resolver: zodResolver(endorsementSchema),
        defaultValues: {
            requestTitle: endorsementRequest.title || "",
            supervisorName: "",
            supervisorPosition: "",
            supervisorCompany: "",
            rating: 0,
            feedback: "",
        },
    })

    const { formState: { isSubmitting } } = form

    const onSubmit = async (values: z.infer<typeof endorsementSchema>) => {
        try {
            const res = axiosInstance.post(`/api/endorsements/request/${endorsementRequest.id}`, {
                ...values,
            })
            await triggerPromiseToast(res, t)
            push("/endorsement-request/confirmation/")
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <SetCookies />
                <FormField
                    control={form.control}
                    name="requestTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("endorsementTitle")}</FormLabel>
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
                            <FormLabel>{t("endorsementRequest.yourName")}</FormLabel>
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
                            <FormLabel>{t("endorsementRequest.yourPosition")}</FormLabel>
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
                            <FormLabel>{t("endorsementRequest.yourCompany")}</FormLabel>
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
                            <FormLabel>{t("endorsementRequest.skillRating")}</FormLabel>
                            <FormControl>
                                <StarRating rating={value} onRatingChange={onChange} allowEdit />
                            </FormControl>
                            <FormDescription>{t("endorsementRequest.skillRatingDescription")}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("feedback")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>{t("feedbackDescription")}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">{t("endorsementRequest.submitEndorsement")}</Button>
            </form>
        </Form>
    )
}