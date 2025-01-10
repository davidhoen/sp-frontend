"use client"

import { getFullName, isTeacherUser, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormatter, useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { FeedbackType, RequestType } from "@/types"
import { Alert } from "../ui/alert"
import { GroupIcon, LightbulbIcon, StarIcon, UserIcon } from "lucide-react"
import { Chip } from "../Chip"
import StarRating from "../StarRating"
import { RequestDetails } from "../RequestDetails"
import { PreviousFeedbackList } from "../PreviousFeedbackList"


// This component can be used for writing self feedback (request is empty)
// OR
// Writing feedback for a peer student 
const AddFeedbackModal = ({ children, request, skillId, parentMutate }: { children: ReactNode, request?: RequestType, skillId?: string, parentMutate?: () => void }) => {
    const t = useTranslations()
    const format = useFormatter()
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({ title: z.string(), feedback: z.string().min(10) })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: request?.title || "",
            feedback: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const env = isTeacherUser(user) ? "educator/requests" : "student"
            const url = request ? `/api/${env}/feedbacks/${request.id}/respond` : `/api/student/skills/${skillId}/feedback`
            const res = axiosInstance.post(url, {
                skill_id: skillId,
                title: values.title,
                content: values.feedback,
                user_id: user?.id,
                request_id: request?.id
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
                            <DialogTitle>{t("modals.addFeedback.title")}</DialogTitle>
                            {/* When students are requested to give feedback, update the description */}
                            <DialogDescription>{(request && !isTeacherUser(user)) ?
                                t("modals.addFeedback.requestDescription", { requester: getFullName(request.requester), skill: request.skill.title, group: request.group.name })
                                :
                                t("modals.addFeedback.description")}
                            </DialogDescription>
                        </DialogHeader>

                        {request && <>
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

                        </>}

                        {/* Title  */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("modals.feedbackTitle")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={t("modals.feedbackTitlePlaceholder")} />
                                    </FormControl>
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

export default AddFeedbackModal
