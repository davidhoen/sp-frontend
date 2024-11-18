import { useEvents } from "@/hooks/use-events"
import { getFullName } from "@/lib"
import { UserType } from "@/types/User"
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

const RequestFeedbackModal = ({ children, requestFromUser }: { children: ReactNode, requestFromUser?: UserType }) => {
    const t = useTranslations("modals")

    // TODO: Replace with useSkills hook
    const { data: events, isLoading } = useEvents()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object(
        requestFromUser ?
            { eventId: z.number(), skillId: z.number() }
            :
            { eventId: z.number(), email: z.string().email() }
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventId: undefined,
            email: "",
            skillId: undefined
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
                            <DialogTitle>{t("requestFeedback.title")}</DialogTitle>
                            <DialogDescription>
                                {requestFromUser ?
                                    t("requestFeedback.fromUserdescription", { name: getFullName(requestFromUser) })
                                    :
                                    t("requestFeedback.fromEmaildescription")
                                }
                            </DialogDescription>
                        </DialogHeader>

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
                                        <FormLabel>{t("email")}</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder={t("emailPlaceholder")} value={field.value ?? ""} />
                                        </FormControl>
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

export default RequestFeedbackModal
