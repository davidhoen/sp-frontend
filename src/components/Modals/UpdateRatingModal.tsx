"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import StarRating from "../StarRating"
import { RatingHistoryType } from "@/types"
import axiosInstance from "@/lib/axios"
import { triggerPromiseToast } from "@/lib"
import { useUser } from "@/providers/UserProvider"

const UpdateRatingModal = ({ children, skillId, currentRating }: { children: ReactNode, skillId: string, currentRating?: number }) => {
    const t = useTranslations("modals")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const minimalRating = currentRating || 0

    const formSchema = z.object({
        rating: z.number().int().min(minimalRating, { message: t("updateStarRating.ratingToLow") }).max(4),
        feedback: z.string().min(10)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: currentRating || 0,
            feedback: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.post(`/api/student/skills/${skillId}/rating_update`, {
                ...values,
                skillId,
            })
            await triggerPromiseToast(res, t)
            setIsModalOpen(false)
            form.reset()
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <DialogHeader>
                            <DialogTitle>{t("updateStarRating.title")}</DialogTitle>
                            <DialogDescription>{t("updateStarRating.description")}</DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormControl>
                                        <StarRating rating={value} onRatingChange={onChange} allowEdit />
                                    </FormControl>
                                    <FormDescription>{t("updateStarRating.selectNewRating")}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                            <Button type="submit">{t("saveChanges")}</Button>
                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>
        </Dialog >

    )
}

export default UpdateRatingModal
