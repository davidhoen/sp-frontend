"use client"

// import { useEvents } from "@/hooks/use-events"
import { Alert } from "@/components/ui/alert"
import { useGroupSkills } from "@/hooks/use-group-skills"
import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserSearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SetCookies from "../../SetCookies"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import Select from "../../ui/select"

const RequestEndorsementModal = ({ children, skillId, groupId, requestFromUser }: { children: ReactNode, skillId?: string, groupId?: string, requestFromUser?: UserType }) => {
    const t = useTranslations("modals")
    const { data: skills } = useGroupSkills(groupId)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showPersonalCoachError, setShowPersonalCoachError] = useState(false)

    const formSchema = z.object(
        requestFromUser ?
            { title: z.string().min(3), skillId: z.string() }
            :
            { title: z.string().min(3), email: z.string().email() }
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
                skill: skillId || values.skillId,
                requestee_email: values.email,
                requestee: requestFromUser?.id,
                groupId: groupId || undefined
            })
            await triggerPromiseToast(res, t, { success: t("successfullySent") })
            form.reset()
            setIsModalOpen(false)
        }
        catch (error: any) {
            // Handle error when user does not have a personal coach
            if (error?.response?.status === 403 && error?.response?.data?.error === "no_personal_coach") {
                setShowPersonalCoachError(true)
            }
            else
                setShowPersonalCoachError(false)
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
                                            <Select options={skills} onChange={(selectedOption) => onChange(selectedOption?.value)} placeholder={t("skillPlaceholder")} />
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

                        {/* Show personal coach alert, when api tells its missing */}
                        {showPersonalCoachError && <div className="space-y-2 w-full">
                            <Alert variant="destructive" className="text-sm flex gap-4 items-center">
                                <div><UserSearchIcon size={24} /></div>
                                <div>{t("requestEndorsement.noPersonalCoach")}</div>
                            </Alert>
                        </div>}

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
