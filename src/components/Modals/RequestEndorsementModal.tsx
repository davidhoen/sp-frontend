"use client"

import { useEvents } from "@/hooks/use-events"
import { getFullName, triggerPromiseToast } from "@/lib"
import { UserType } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import Select from "../ui/select"
import axios from "axios"
import axiosInstance from "@/lib/axios"
import SetCookies from "../SetCookies"

const RequestEndorsementModal = ({ children, skillId, requestFromUser }: { children: ReactNode, skillId?: string, requestFromUser?: UserType }) => {
    const t = useTranslations("modals")
    // TODO: Replace with useSkills of student
    const { data: events } = useEvents()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object(
        requestFromUser ?
            { title: z.string(), skillId: z.string() }
            :
            { title: z.string(), email: z.string().email() }
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            email: "",
            skillId,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.post(`/api/student/endorsements/request`, {
                ...values,
                skill: skillId,
                requestee_email: values.email,
                requestee: requestFromUser?.id
            })
            await triggerPromiseToast(res, t, { success: t("successfullySent") })
            form.reset()
            setIsModalOpen(false)
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
                            <DialogTitle>{t("requestEndorsement.title")}</DialogTitle>
                            <DialogDescription>
                                {requestFromUser ?
                                    t("requestEndorsement.fromUserdescription", { name: getFullName(requestFromUser) })
                                    :
                                    t("requestEndorsement.fromEmaildescription")
                                }
                            </DialogDescription>
                        </DialogHeader>

                        <SetCookies />

                        {/* Title for endorsement */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("endorsementTitle")}</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder={t("endorsementTitlePlaceholder")} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {requestFromUser ?
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
                            :
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("requestEndorsement.workEmail")}</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder={t("requestEndorsement.workEmailPlaceholder")} />
                                        </FormControl>
                                        <FormDescription>{t("requestEndorsement.workEmailDescription")}</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }

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

export default RequestEndorsementModal
