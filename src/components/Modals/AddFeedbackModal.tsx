"use client"

import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const AddFeedbackModal = ({ children, skillId, mutate }: { children: ReactNode, skillId?: string, mutate?: () => void }) => {
    const t = useTranslations("modals")
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({
        title: z.string(),
        feedback: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            feedback: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.post(`/api/student/skills/${skillId}/feedback`, {
                ...values,
                skillId,
                userId: user?.id
            })
            await triggerPromiseToast(res, t)
            mutate && mutate()
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <DialogHeader>
                            <DialogTitle>{t("addFeedback.title")}</DialogTitle>
                            <DialogDescription>{t("addFeedback.description")}</DialogDescription>
                        </DialogHeader>

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
