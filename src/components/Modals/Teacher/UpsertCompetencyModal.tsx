"use client"

import { Textarea } from "@/components/ui/textarea"
import { useProfiles } from "@/hooks/use-profiles"
import { useSkills } from "@/hooks/use-skills"
import { useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { CompetencyType } from "@/types"
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

const UpsertCompetencyModal = ({ children, competency, mutate }: { children: ReactNode, competency?: CompetencyType, mutate?: () => void }) => {
  const t = useTranslations()
  const { refresh } = useRouter()

  const { data: skills } = useSkills()
  const { data: profiles } = useProfiles()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    title: z.string().min(3),
    desc: z.string().min(3),
    overview: z.string().min(3),
    skillIds: z.array(z.string()),
    profileIds: z.array(z.string()).min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Reset form when competency changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        title: competency?.title ?? "",
        desc: competency?.desc ?? "",
        overview: competency?.overview ?? "",
        skillIds: competency?.skills?.map(skill => skill.id) ?? [],
        profileIds: competency?.profiles?.map(profile => profile.id) ?? [],
      })
    }
  }, [competency, isModalOpen, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = competency ? `/api/educator/competencies/${competency.id}` : `/api/educator/competencies/create`
      const axiosMethod = competency ? axiosInstance.put : axiosInstance.post
      const res = axiosMethod(url, {
        title: values.title,
        desc: values.desc,
        overview: values.overview,
        skills: values.skillIds,
        profiles: values.profileIds,
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
              <DialogTitle>{t(competency ? "modals.upsertCompetency.update" : "modals.upsertCompetency.create")}</DialogTitle>
            </DialogHeader>

            {/* Title of the competency */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.title")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("modals.upsertCompetency.titlePlaceholder")} />
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
                    <Textarea {...field} placeholder={t("modals.upsertCompetency.descriptionPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("modals.overview")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t("modals.upsertCompetency.overviewPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="skillIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.skills")}</FormLabel>
                  <FormControl>
                    <Select options={skills}
                      placeholder={t("modals.upsertCompetency.skillsPlaceholder")}
                      value={skills?.filter(student => value.includes(student.value))}
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
              name="profileIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.profiles")}</FormLabel>
                  <FormControl>
                    <Select
                      options={profiles}
                      placeholder={t("modals.upsertCompetency.profilesPlaceholder")}
                      value={profiles?.filter(profile => value.includes(profile.value))}
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

export default UpsertCompetencyModal
