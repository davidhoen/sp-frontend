import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import StarRating from "../StarRating"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

const UpdateRatingModal = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("modals")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({
        rating: z.number().int().min(1).max(4),
        feedback: z.string().min(10)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            feedback: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        setIsModalOpen(false)
        form.reset()
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
                                        <StarRating rating={value} onRatingChange={(newRating) => onChange(newRating)} allowEdit />
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
                                    <FormLabel>{t("updateStarRating.form.feedback")}</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder={t("updateStarRating.form.feedbackPlaceholder")} />
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
