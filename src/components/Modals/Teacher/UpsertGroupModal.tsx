"use client"

import { Textarea } from "@/components/ui/textarea"
import { GroupType } from "@/types"
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

const UpsertGroupModal = ({ children, group }: { children: ReactNode, group?: GroupType }) => {
  const t = useTranslations("modals")

  // TODO: Replace with useSkills hook
  // const { data: events, isLoading } = useEvents()

  const events = [
    { value: "event1", label: "Event 1" },
    { value: "event2", label: "Event 2" },
    { value: "event3", label: "Event 3" },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    name: z.string(),
    desc: z.string(),
    skillIds: z.array(z.string()),
    teacherIds: z.array(z.string()),
    studentIds: z.array(z.string()),
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group?.name ?? "",
      desc: group?.desc ?? "",
      skillIds: group?.skills?.map(skill => skill.id) ?? [],
      teacherIds: group?.teachers?.map(teacher => teacher.id) ?? [],
      studentIds: group?.students?.map(student => student.id) ?? []
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
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <DialogHeader>
              <DialogTitle>{t(group ? "upsertGroup.create" : "upsertGroup.update")}</DialogTitle>
            </DialogHeader>

            {/* Title of the feedback */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedbackTitle")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("feedbackTitlePlaceholder")} />
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
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder={t("feedbackPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skillIds"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>{t("skill")}</FormLabel>
                  <FormControl>
                    <Select options={events} onChange={(selectedOption) => onChange(selectedOption?.values)} placeholder={t("skillPlaceholder")} isMulti />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacherIds"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>{t("skill")}</FormLabel>
                  <FormControl>
                    <Select options={events} onChange={(selectedOption) => onChange(selectedOption?.values)} placeholder={t("skillPlaceholder")} isMulti />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentIds"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>{t("skill")}</FormLabel>
                  <FormControl>
                    <Select options={events} onChange={(selectedOption) => onChange(selectedOption?.values)} placeholder={t("skillPlaceholder")} isMulti />
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

export default UpsertGroupModal
