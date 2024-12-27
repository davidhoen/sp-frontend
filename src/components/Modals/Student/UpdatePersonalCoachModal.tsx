"use client"

import { useCoaches } from "@/hooks/use-coaches"
import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import Select from "../../ui/select"
import UserAvatar from "../../UserAvatar"

const UpdatePersonalCoachModal = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("modals")
    const { data: coaches } = useCoaches()

    const [currentCoach, setCurrentCoach] = useState<UserType | undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchCurrentCoach = async () => {
            try {
                const { data: { data: user } } = await axiosInstance.get<{ data: UserType }>("/api/user?with=personalCoach")
                if (user.personal_coach) {
                    setCurrentCoach(user.personal_coach)
                }
            } catch (error) {
                console.error("Error fetching current coach:", error)
            }
        }

        if (isModalOpen) {
            fetchCurrentCoach()
        }
    }, [isModalOpen])

    const formSchema = z.object({ coachUserId: z.string() })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const { formState: { isDirty, isValid } } = form

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.put(`/api/student/personal_coach`, {
                personal_coach_id: values.coachUserId
            })
            await triggerPromiseToast(res, t)
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
                            <DialogTitle className="mb-2">{t("updatePersonalCoach.title")}</DialogTitle>
                            <DialogDescription>
                                {t("updatePersonalCoach.description")}
                            </DialogDescription>
                        </DialogHeader>

                        {currentCoach && <div>
                            <div className="text-sm font-bold mb-1">{t("updatePersonalCoach.yourCoach")}:</div>
                            <div className="flex gap-4 items-center w-full bg-muted rounded-lg p-2">
                                <UserAvatar user={currentCoach} />
                                <div>{getFullName(currentCoach)}</div>
                            </div>
                        </div>}

                        <FormField
                            control={form.control}
                            name="coachUserId"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("updatePersonalCoach.selectCoach")}</FormLabel>
                                    <FormControl>
                                        <Select options={coaches} placeholder={t("updatePersonalCoach.selectCoach")} onChange={(selectedOption) => onChange(selectedOption?.value)} />
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
                            <Button type="submit" disabled={!isDirty || !isValid}>{t("save")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdatePersonalCoachModal
