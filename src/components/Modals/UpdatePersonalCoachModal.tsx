"use client"

// import { useEvents } from "@/hooks/use-events"
import { useUser } from "@/providers/UserProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Select from "../ui/select"
import axiosInstance from "@/lib/axios"
import { triggerPromiseToast } from "@/lib"

const UpdatePersonalCoachModal = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("modals")
    const { user } = useUser()

    // TODO: Replace with useCoaches of student
    // const { data: coaches } = useEvents()
    const coaches = [
        { value: "1", label: "Coach 1" },
        { value: "2", label: "Coach 2" },
        { value: "3", label: "Coach 3" },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({ coachUserId: z.string() })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            coachUserId: user?.personal_coach?.id,
        }
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
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle className="mb-2">{t("updatePersonalCoach.title")}</DialogTitle>
                            <DialogDescription>
                                {t("updatePersonalCoach.description")}
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="coachUserId"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("updatePersonalCoach.yourCoach")}</FormLabel>
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
