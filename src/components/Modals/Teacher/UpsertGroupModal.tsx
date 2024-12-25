"use client"

import { Textarea } from "@/components/ui/textarea"
import { GroupType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { ReactNode, useEffect, useMemo, useState } from "react"
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
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useCoaches } from "@/hooks/use-coaches"
import { useStudents } from "@/hooks/use-students"

const UpsertGroupModal = ({ children, group, mutate }: { children: ReactNode, group?: GroupType, mutate?: () => void }) => {
  const t = useTranslations()

  const { data: skills } = useSkills()
  const { data: teachers } = useCoaches()
  const { data: students } = useStudents()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const formSchema = z.object({
    name: z.string().min(3),
    desc: z.string().min(3),
    skillIds: z.array(z.string()).min(1),
    teacherIds: z.array(z.string()),
    studentIds: z.array(z.string()),
    archived: z.boolean().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Reset form when group changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        name: group?.name ?? "",
        desc: group?.desc ?? "",
        skillIds: group?.skills?.map(skill => skill.id) ?? [],
        teacherIds: group?.teachers?.map(teacher => teacher.id) ?? [],
        studentIds: group?.students?.map(student => student.id) ?? [],
        archived: !!group?.archived_at
      })
    }
  }, [group, isModalOpen, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = group ? `/api/teacher/groups/${group.id}` : `/api/teacher/groups/create`
      const axiosMethod = group ? axiosInstance.put : axiosInstance.post
      const res = axiosMethod(url, {
        name: values.name,
        desc: values.desc,
        skills: values.skillIds,
        teachers: values.teacherIds,
        students: values.studentIds,
        archived_at: !!values.archived ? new Date() : null
      })
      await triggerPromiseToast(res, t, { success: t("modals.successfullySaved"), error: t("modals.genericError"), loading: t("modals.loading") })
      mutate && mutate()
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
              <DialogTitle>{t(group ? "modals.upsertGroup.create" : "modals.upsertGroup.update")}</DialogTitle>
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
