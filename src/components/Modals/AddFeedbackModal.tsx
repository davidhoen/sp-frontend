import { useEvents } from "@/hooks/use-events"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Select from "../ui/select"
import { Textarea } from "../ui/textarea"

const AddFeedbackModal = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("modals")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data: events, isLoading } = useEvents()

    const formSchema = z.object({
        eventId: z.number(),
        feedback: z.string().min(10)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventId: undefined,
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
                            <DialogTitle>{t("addFeedback.title")}</DialogTitle>
                            <DialogDescription>{t("addFeedback.description")}</DialogDescription>
                        </DialogHeader>

                        {/* Event  */}
                        <FormField
                            control={form.control}
                            name="eventId"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("event")}</FormLabel>
                                    <FormControl>
                                        <Select options={events} isLoading={isLoading} onChange={(selectedOption) => onChange(selectedOption?.value)} placeholder={t("eventPlaceholder")} />
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
