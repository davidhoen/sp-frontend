"use client"

import { Textarea } from "@/components/ui/textarea"
import { SkillType } from "@/types"
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
import { useCompetencies } from "@/hooks/use-compentencies"
import axiosInstance from "@/lib/axios"
import { triggerPromiseToast } from "@/lib"
import { useRouter } from "@/i18n/routing"
import { useUser } from "@/providers/UserProvider"

const UpsertSkillModal = ({ children, skill }: { children: ReactNode, skill?: SkillType }) => {
  const t = useTranslations()
  const { refresh } = useRouter()

  const { data: competencies } = useCompetencies()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    title: z.string().min(3),
    desc: z.string().min(3),
    competencyId: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  // Reset form when skill changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        title: skill?.title ?? "",
        desc: skill?.desc ?? "",
        competencyId: skill?.competency?.id ?? ""
      })
    }
  }, [skill, isModalOpen, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = skill ? `/api/educator/skills/${skill.id}` : `/api/educator/skills/create`
      const axiosMethod = skill ? axiosInstance.put : axiosInstance.post
      const res = axiosMethod(url, {
        ...values,
        competency_id: values.competencyId
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
      <DialogContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <DialogHeader>
              <DialogTitle>{t(skill ? "modals.upsertSkill.update" : "modals.upsertSkill.create")}</DialogTitle>
            </DialogHeader>

            {/* Title of the skills */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.title")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("modals.upsertSkill.titlePlaceholder")} />
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
                    <Textarea {...field} placeholder={t("modals.upsertSkill.descriptionPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competencyId"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.competency")}</FormLabel>
                  <FormControl>
                    <Select
                      options={competencies}
                      placeholder={t("modals.upsertSkill.competencyPlaceholder")}
                      value={competencies?.filter(competency => value.includes(competency.value))}
                      onChange={(selectedOption) => onChange(selectedOption?.value)}
                    />
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

export default UpsertSkillModal
