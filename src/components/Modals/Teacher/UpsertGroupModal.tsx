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
import { useSkills } from "@/hooks/use-skills"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const UpsertGroupModal = ({ children, group }: { children: ReactNode, group?: GroupType }) => {
  const t = useTranslations()

  const { data: skills } = useSkills()
  const { data: teachers } = useSkills()
  const { data: students } = useSkills()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().min(3),
    desc: z.string().min(3),
    skillIds: z.array(z.string()).min(1),
    teacherIds: z.array(z.string()).min(1),
    studentIds: z.array(z.string()).min(1),
    archived: z.boolean().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group?.name ?? "",
      desc: group?.desc ?? "",
      skillIds: group?.skills?.map(skill => skill.id) ?? [],
      teacherIds: group?.teachers?.map(teacher => teacher.id) ?? [],
      studentIds: group?.students?.map(student => student.id) ?? [],
      archived: !!group?.archived_at
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
              <DialogTitle>{t(group ? "modals.upsertGroup.update" : "modals.upsertGroup.create")}</DialogTitle>
            </DialogHeader>

            {/* Title of the feedback */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("modals.upsertGroup.namePlaceholder")} />
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
                    <Textarea {...field} placeholder={t("modals.upsertGroup.descriptionPlaceholder")} />
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
                      placeholder={t("modals.skillPlaceholder")}
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
              name="teacherIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.teachers")}</FormLabel>
                  <FormControl>
                    <Select
                      options={teachers}
                      placeholder={t("modals.upsertGroup.teachersPlaceholder")}
                      value={teachers?.filter(student => value.includes(student.value))}
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
              name="studentIds"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.students")}</FormLabel>
                  <FormControl>
                    <Select
                      options={students}
                      placeholder={t("modals.upsertGroup.studentsPlaceholder")}
                      value={students?.filter(student => value.includes(student.value))}
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
              name="archived"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="archived"
                        checked={value}
                        onCheckedChange={onChange}
                      />
                      <Label htmlFor="archived">{t("general.archived")}</Label>
                    </div>
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

export default UpsertGroupModal
