"use client"

import { useRoles } from "@/hooks/use-roles"
import { useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { BaseUserSchema } from "@/schemas/zod"
import { UserType } from "@/types/auth"
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

// For now create user is not supported, use register instead
const UpsertUserModal = ({ children, user, mutate }: { children: ReactNode, user?: UserType, mutate?: () => void }) => {
  const t = useTranslations()
  const { refresh } = useRouter()

  const { data: roles } = useRoles()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm<z.infer<typeof BaseUserSchema>>({
    resolver: zodResolver(BaseUserSchema),
  })

  // Reset form when user changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        first_name: user?.first_name ?? "",
        last_name: user?.last_name ?? "",
        role_id: user?.role?.id ?? 1,
        email: user?.email ?? "",
      })
    }
  }, [user, isModalOpen, form])

  const onSubmit = async (values: z.infer<typeof BaseUserSchema>) => {
    try {
      const url = user ? `/api/admin/users/${user.id}` : `/api/admin/users/create`
      const axiosMethod = user ? axiosInstance.put : axiosInstance.post
      const res = axiosMethod(url, values)
      await triggerPromiseToast(res, t, { success: t("modals.successfullySaved"), error: t("modals.genericError"), loading: t("modals.loading") })

      refresh()
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
              <DialogTitle>{t(user ? "modals.upsertUser.update" : "modals.upsertUser.create")}</DialogTitle>
            </DialogHeader>

            {/* Firstname  */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("modals.upsertUser.firstName")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lastname  */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("modals.upsertUser.lastName")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("general.email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role_id"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>{t("general.teachers")}</FormLabel>
                  <FormControl>
                    <Select
                      options={roles}
                      onChange={(selectedOption) => onChange(selectedOption?.value)}
                      defaultValue={roles?.filter(role => role?.value === user?.role.id)}
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

export default UpsertUserModal
