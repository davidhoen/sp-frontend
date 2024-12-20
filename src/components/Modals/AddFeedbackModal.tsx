"use client"

import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { StudentRequestType } from "@/types"
import { Alert } from "../ui/alert"


// This component can be used for writing self feedback (request is empty)
// OR
// Writing feedback for a peer student 
const AddFeedbackModal = ({ children, request, skillId, parentMutate }: { children: ReactNode, request?: StudentRequestType, skillId?: string, parentMutate?: () => void }) => {
    const t = useTranslations("modals")
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({ title: z.string(), feedback: z.string().min(10) })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
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

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <DialogHeader>
                            <DialogTitle>{t("addFeedback.title")}</DialogTitle>
                            <DialogDescription>{request ?
                                t("addFeedback.requestDescription", { requester: getFullName(request.requester), skill: request.skill.title, group: request.group.name })
                                :
                                t("addFeedback.description")}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Title of the request  */}
                        {request && <Alert className="text-sm">{request.title}</Alert>}

                        {/* Title  */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("feedbackTitle")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={t("feedbackTitlePlaceholder")} />
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
                                    <FormLabel>{t("feedback")}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder={t("feedbackPlaceholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {/* Cancel */}
                            <DialogClose asChild>
                                <Button type="button" variant="outline">{t("cancel")}</Button>
                            </DialogClose>
                            {/* Submit */}
                            <Button type="submit">{t("save")}</Button>
                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>
        </Dialog >

    )
}

export default AddFeedbackModal
