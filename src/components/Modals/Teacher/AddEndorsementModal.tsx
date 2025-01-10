"use client"

import { PreviousFeedbackList } from "@/components/PreviousFeedbackList"
import { RequestDetails } from "@/components/RequestDetails"
import { isTeacherUser, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { RequestType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import { z } from "zod"
import StarRating from "../../StarRating"
import { Alert } from "../../ui/alert"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"

const AddEndorsementModal = ({ children, request, parentMutate }: { children: ReactNode, request: RequestType, parentMutate?: () => void }) => {
    const t = useTranslations()
    const { user } = useUser()


    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({
        title: z.string(),
        rating: z.number().int().max(4),
        feedback: z.string().min(10)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: request?.title || "",
            rating: 0,
            feedback: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.post(`/api/educator/requests/endorsement/${request.id}/respond`, {
                title: values.title,
                content: values.feedback,
                rating: values.rating,
                request_id: request.id
            })
            await triggerPromiseToast(res, t, { success: t("modals.successfullySaved"), error: t("modals.genericError"), loading: t("modals.loading") })

            mutate((key) => typeof key === 'string' && key.startsWith('/api/skills/'))
            parentMutate && parentMutate()

            setIsModalOpen(false)
            form.reset()
        }
        catch (error) {
            console.error(error)
        }
    }

    if (!user) return null

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <DialogHeader>
                            <DialogTitle>{t("modals.addEndorsement.title")}</DialogTitle>
                            <DialogDescription>{t("modals.addEndorsement.description")}</DialogDescription>
                        </DialogHeader>

                        {/* Request details (title for students and more details for teachers)  */}
                        <Alert className="text-sm">
                            {
                                !isTeacherUser(user) ?
                                    request.title
                                    :
                                    <RequestDetails request={request} />
                            }
                        </Alert>

                        {/* Previous feedback for and from teachers */}
                        {isTeacherUser(user) && <div>
                            <FormLabel>{t("general.previousFeedback")}</FormLabel>
                            <PreviousFeedbackList studentId={request.requester.id} skillId={request.skill.id} />
                        </div>}

                        {/* Title  */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("modals.endorsementTitle")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={t("modals.endorsementTitlePlaceholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("modals.endorsementRequest.skillRating")}</FormLabel>
                                    <FormControl>
                                        <StarRating rating={value} onRatingChange={onChange} allowEdit />
                                    </FormControl>
                                    <FormDescription>{t("modals.endorsementRequest.skillRatingDescription")}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Feedback */}
                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("modals.feedback")}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder={t("modals.feedbackPlaceholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {/* Cancel */}
                            <DialogClose asChild>
                                <Button type="button" variant="outline">{t("modals.cancel")}</Button>
                            </DialogClose>
                            {/* Submit */}
                            <Button type="submit">{t("modals.save")}</Button>
                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>
        </Dialog >

    )
}

export default AddEndorsementModal
