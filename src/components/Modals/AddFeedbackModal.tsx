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
import { RequestType } from "@/types"
import { Alert } from "../ui/alert"
import { GroupIcon, LightbulbIcon, StarIcon, UserIcon } from "lucide-react"
import { Chip } from "../Chip"
import StarRating from "../StarRating"


// This component can be used for writing self feedback (request is empty)
// OR
// Writing feedback for a peer student 
const AddFeedbackModal = ({ children, request, skillId, parentMutate }: { children: ReactNode, request?: RequestType, skillId?: string, parentMutate?: () => void }) => {
    const t = useTranslations()
    const format = useFormatter()
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({ title: z.string(), feedback: z.string().min(10) })

    // TODO: Replace with real data
    const previousFeedbacks = [
        { title: "Feedback title", content: "Feedback content", created_at: new Date() },
        { title: "Feedback title 2", content: "Feedback content 2", created_at: new Date() },
        { title: "Feedback title 3", content: "Feedback content 3", created_at: new Date() }
    ]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: request?.title || "",
            feedback: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = request ? `/api/student/feedbacks/${request.id}/respond` : `/api/student/skills/${skillId}/feedback`
            const res = axiosInstance.post(url, {
                skill_id: skillId,
                title: values.title,
                content: values.feedback,
                user_id: user?.id,
                request_id: request?.id
            })
            await triggerPromiseToast(res, t)

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
                            <DialogDescription>{request ?
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
                                        <div className="flex gap-6 grid-cols-2">
                                            <div className="font-medium">
                                                <div className="flex gap-2"><UserIcon size={16} />{t('general.student')}:</div>
                                                <div className="flex gap-2"><GroupIcon size={16} />{t('general.group')}:</div>
                                                <div className="flex gap-2"><StarIcon size={16} />{t('general.skill')}:</div>
                                                <div className="flex gap-2"><LightbulbIcon size={16} />{t('general.event')}:</div>
                                            </div>
                                            <div>
                                                <div className="flex">{getFullName(request.requester)}</div>
                                                <div>{request.group.name}</div>
                                                <div className="flex gap-2">
                                                    <Chip>{request.skill.title}</Chip>
                                                    <StarRating rating={request.skill.rating} />
                                                </div>
                                                <div>{request.title}</div>
                                            </div>
                                        </div>
                                }
                            </Alert>

                            {/* Previous feedback for and from teachers */}
                            {(previousFeedbacks.length && isTeacherUser(user)) && <div>
                                <FormLabel>{t("general.previousFeedback")}</FormLabel>
                                <Alert className="flex flex-col gap-4 text-sm">
                                    {previousFeedbacks.map(feedback => <div key={feedback.title}>
                                        <div className="font-medium">{feedback.title}</div>
                                        <div>{feedback.content}</div>
                                        <div className="text-muted-foreground">{format.dateTime(new Date(request.created_at), { dateStyle: "medium" })}</div>
                                    </div>)}
                                </Alert>
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
