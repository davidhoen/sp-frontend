"use client"

import { useEvents } from "@/hooks/use-events"
import { getFullName } from "@/lib"
import { UserType } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Select from "../ui/select"

const RequestFeedbackModal = ({ children, requestFromUser, skillId }: { children: ReactNode, requestFromUser: UserType, skillId?: string, }) => {
    const t = useTranslations("modals")

    // TODO: Replace with useSkills hook
    const { data: events, isLoading } = useEvents()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({ title: z.string(), skillId: z.string() })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            skillId
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        setIsModalOpen(false)
        form.reset()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <DialogHeader>
                            <DialogTitle>{t("requestFeedback.title")}</DialogTitle>
                            <DialogDescription>
                                {requestFromUser ?
                                    t("requestFeedback.fromUserdescription", { name: getFullName(requestFromUser) })
                                    :
                                    t("requestFeedback.fromEmaildescription")
                                }
                            </DialogDescription>
                        </DialogHeader>

                        {/* Title of the feedback */}
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

                        <FormField
                            control={form.control}
                            name="skillId"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("skill")}</FormLabel>
                                    <FormControl>
                                        <Select options={events} onChange={(selectedOption) => onChange(selectedOption?.value)} placeholder={t("skillPlaceholder")} />
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

export default RequestFeedbackModal
