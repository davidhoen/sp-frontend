"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { RequestType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormatter, useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import { z } from "zod"
import { Chip } from "../../Chip"
import StarRating from "../../StarRating"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Alert } from "@/components/ui/alert"

const ReviewEndorsementModal = ({ children, request, parentMutate }: { children: ReactNode, request: RequestType, parentMutate?: () => void }) => {
    const t = useTranslations()
    const { user } = useUser()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const formSchema = z.object({
        approved: z.enum(["true", "false"])
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = axiosInstance.post(`/api/educator/requests/endorsement/${request.id}/review`, {
                is_approved: values.approved
            })
            await triggerPromiseToast(res, t, { success: t("modals.successfullySaved"), error: t("modals.genericError"), loading: t("modals.loading") })

            mutate((key) => typeof key === 'string' && key.startsWith('/api/skills/'))
            parentMutate && parentMutate()

            setIsModalOpen(false)
            form.reset()
        }
        catch (error) {
            console.error(error)
        }
    }

    if (!user) return null

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <DialogHeader>
                            <DialogTitle>{t("modals.reviewEndorsement.title")}</DialogTitle>
                        </DialogHeader>

                        {/* Student information */}
                        <div>
                            <div className="grid grid-cols-3 p-1 text-sm font-medium">
                                <div> {t("general.student")}</div>
                                <div> {t("general.skill")}</div>
                                <div> {t("general.currentRating")}</div>
                            </div>
                            <div className="grid grid-cols-3 border rounded-md p-1">
                                <div>{getFullName(request.requester)}</div>
                                <div><Chip>{request.skill.title}</Chip></div>
                                <div><StarRating rating={request.skill?.rating || 0} /></div>
                            </div>
                        </div>

                        {/* Writer of the endorsement information */}
                        <div>
                            <FormLabel>{t("modals.reviewEndorsement.writerOfEndorsement")}</FormLabel>
                            <Alert className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium">{request.requestee?.supervisorName}</span>
                                    <p>{t("modals.reviewEndorsement.positionAtCompany", { position: request.requestee?.supervisorPosition, company: request.requestee?.supervisorCompany })} </p>
                                </div>
                                <div>
                                    {request.requestee_email}
                                </div>
                            </Alert>
                        </div>

                        {/* Endorsement content */}
                        <div>
                            <FormLabel>{t("general.endorsement")}</FormLabel>
                            <Alert>
                                <div className="flex justify-between pb-2">
                                    <span className="font-medium text-lg">{request.title}</span>
                                    <StarRating rating={request.requestee?.rating || 0} />
                                </div>
                                <p>{request.requestee?.feedback}</p>
                            </Alert>
                        </div>


                        {/* Is approved */}
                        <FormField
                            control={form.control}
                            name="approved"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>{t("general.review")}</FormLabel>
                                    <FormControl>
                                        <ToggleGroup type="single" value={value} onValueChange={onChange}>
                                            <ToggleGroupItem variant="outline" value="true">{t("modals.approve")}</ToggleGroupItem>
                                            <ToggleGroupItem variant="outline" value="false">{t("modals.reject")}</ToggleGroupItem>
                                        </ToggleGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {/* Cancel */}
                            <DialogClose asChild>
                                <Button type="button" variant="outline">{t("modals.cancel")}</Button>
                            </DialogClose>
                            {/* Submit */}
                            <Button type="submit">{t("modals.submit")}</Button>
                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>
        </Dialog >

    )
}

export default ReviewEndorsementModal
