"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import ApplicationLogo from "@/components/ApplicationLogo"
import AuthCard from "@/components/AuthCard"
import SubmitFormButton from "@/components/SubmitFormButton"
import Select from "@/components/ui/select"
import { Link, useRouter } from "@/i18n/routing"

import { useRoles } from "@/hooks/use-roles"
import { roleBasePathMap, triggerPromiseToast } from "@/lib"
import { register } from "@/lib/auth/client"
import { handleBackendFormErrors } from "@/lib/utils"
import { useUser } from "@/providers/UserProvider"
import { RegisterRequest } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"

const RegisterPage = () => {
  const router = useRouter()
  const { registerUser } = useUser();
  const t = useTranslations("general")

  const { data: roles } = useRoles()

  const filteredRoles = roles?.filter(role => role.label.toLowerCase() !== "admin")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof RegisterRequest>>({
    resolver: zodResolver(RegisterRequest),
    defaultValues: {
      first_name: "",
      last_name: "",
      role_id: 1,
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterRequest>) => {
    setIsSubmitting(true)

    try {
      const user = await register(values);
      const res = fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ user }),
        cache: "no-store",
      });

      await triggerPromiseToast(res, t)
      registerUser(user);

      router.push(roleBasePathMap[user?.role.name] ?? "/");
    } catch (error: any) {
      // toast.error(t("genericError"))
      handleBackendFormErrors({
        setError: form.setError,
        error,
        toast(options) { },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  First name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="background-light900_dark text-slate900_light800 placeholder no-focus slate-border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Last name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="background-light900_dark text-slate900_light800 placeholder no-focus slate-border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="background-light900_dark text-slate900_light800 placeholder no-focus slate-border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role_id"
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Role <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select options={filteredRoles} onChange={(selectedOption) => onChange(selectedOption?.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <div className="background-light900_dark slate-border flex items-center justify-between rounded-md border">
                  <FormControl>
                    <div className="flex justify-between w-full">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="text-slate900_light800 placeholder no-focus flex-1 border-none bg-transparent outline-none"
                        {...field}
                      />
                      <div
                        className="flex cursor-pointer select-none items-center pr-4"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosedIcon className="text-slate900_light800 size-4" />
                        ) : (
                          <EyeIcon className="text-slate900_light800 size-4" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Password Confirmation{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <div className="background-light900_dark slate-border flex items-center justify-between rounded-md border">
                  <FormControl>
                    <div className="flex justify-between w-full">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="text-slate900_light800 placeholder no-focus flex-1 border-none bg-transparent outline-none"
                        {...field}
                      />
                      <div
                        className="flex cursor-pointer select-none items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosedIcon className="text-slate900_light800 size-4" />
                        ) : (
                          <EyeIcon className="text-slate900_light800 size-4" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitFormButton
            isSubmitting={isSubmitting}
            submitLabel="Register"
            extraElement={
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="text-slate900_light800 text-sm underline"
                >
                  Already have an account?
                </Link>
              </div>
            }
          />
        </form>
      </Form>
    </AuthCard>
  )
}

export default RegisterPage
