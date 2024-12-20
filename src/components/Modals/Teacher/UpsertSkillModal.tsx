"use client"

import { Textarea } from "@/components/ui/textarea"
import { SkillType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import Select from "../../ui/select"
import { useCompetencies } from "@/hooks/use-compentencies"

const UpsertSkillModal = ({ children, skill }: { children: ReactNode, skill?: SkillType }) => {
  const t = useTranslations()

  const { data: competencies } = useCompetencies()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().min(3),
    desc: z.string().min(3),
    competenceIds: z.array(z.string()).min(1)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: skill?.title ?? "",
      desc: skill?.desc ?? "",
      competenceIds: skill?.competency ? [skill.competency.id] : []
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsModalOpen(false)
    form.reset()
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

            {/* Title of the feedback */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("modals.upsertSkill.namePlaceholder")} />
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
              name="competenceIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.competence")}</FormLabel>
                  <FormControl>
                    <Select options={competencies}
                      placeholder={t("modals.competencePlaceholder")}
                      value={competencies}
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

export default UpsertSkillModal
