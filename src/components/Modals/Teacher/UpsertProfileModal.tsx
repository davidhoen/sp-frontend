"use client"

import { IconPicker } from "@/components/IconPicker"
import { ColorPicker } from "@/components/ui/color-picker"
import { Textarea } from "@/components/ui/textarea"
import { useCompetencies } from "@/hooks/use-compentencies"
import { useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { ProfileWithCompetencies } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import Select from "../../ui/select"

const UpsertProfileModal = ({ children, profile, mutate }: { children: ReactNode, profile?: ProfileWithCompetencies, mutate?: () => void }) => {
  const t = useTranslations()
  const { refresh } = useRouter()

  const { data: competencies } = useCompetencies()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    title: z.string().min(3),
    desc: z.string().min(3),
    competencyIds: z.array(z.string()).min(1),
    color: z.string().min(3),
    icon: z.string().min(3)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Reset form when profile changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        title: profile?.title ?? "",
        desc: profile?.desc ?? "",
        competencyIds: profile?.competencies.map(competency => competency.id) ?? [],
        color: profile?.color ?? "#ffffff",
        icon: profile?.icon ?? ""
      })
    }
  }, [profile, isModalOpen, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { competencyIds, ...data } = values
      const url = profile ? `/api/educator/profiles/${profile.id}` : `/api/educator/profiles/create`
      const axiosMethod = profile ? axiosInstance.put : axiosInstance.post
      const res = axiosMethod(url, {
        ...data,
        competencies: competencyIds
      })
      await triggerPromiseToast(res, t, { success: t("modals.successfullySaved"), error: t("modals.genericError"), loading: t("modals.loading") })

      refresh()

      setIsModalOpen(false)
      form.reset()
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <DialogHeader>
              <DialogTitle>{t(profile ? "modals.upsertProfile.update" : "modals.upsertProfile.create")}</DialogTitle>
            </DialogHeader>

            {/* Title of the profile */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.title")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("modals.upsertProfile.titlePlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("modals.description")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t("modals.upsertProfile.descriptionPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competencyIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.competencies")}</FormLabel>
                  <FormControl>
                    <Select
                      options={competencies}
                      placeholder={t("modals.upsertProfile.competenciesPlaceholder")}
                      value={competencies?.filter(competency => value.includes(competency.value))}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                        onChange(values);
                      }}
                      isMulti
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.color")}</FormLabel>
                  <FormControl>
                    <ColorPicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.icon")}</FormLabel>
                  <FormControl>
                    <IconPicker {...field} />
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
              <Button type="submit">{t("modals.save")}</Button>
            </DialogFooter>

          </form>
        </Form>

      </DialogContent>
    </Dialog >

  )
}

export default UpsertProfileModal
