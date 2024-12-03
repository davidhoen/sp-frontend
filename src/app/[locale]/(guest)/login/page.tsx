"use client"
import ApplicationLogo from "@/components/ApplicationLogo"
import AuthCard from "@/components/AuthCard"
import SubmitFormButton from "@/components/SubmitFormButton"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DASHBOARD_ROUTE } from "@/constants"
import { Link, useRouter } from "@/i18n/routing"
import { roleBasePathMap } from "@/lib"
import { login } from "@/lib/auth/client"
import { handleBackendFormErrors } from "@/lib/utils"
import { useUser } from "@/providers/UserProvider"
import { LoginRequest } from "@/schemas/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const router = useRouter()
  const { registerUser } = useUser()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof LoginRequest>>({
    resolver: zodResolver(LoginRequest),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginRequest>) => {
    setIsSubmitting(true)

    try {
      const user = await login(values);
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ user }),
        cache: "no-store"
      });
      registerUser(user)
      router.push(roleBasePathMap[user?.role.name] ?? "/");
    } catch (error: any) {
      handleBackendFormErrors({
        setError: form.setError,
        error,
        toast(options) { },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
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
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Password</FormLabel>
                <div className="background-light900_dark slate-border flex items-center justify-between rounded-md border">
                  <FormControl>
                    <>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Your password"
                        className="text-slate900_light800 placeholder no-focus flex-1 border-none bg-transparent outline-none"
                        {...field}
                      />
                      <div
                        className="flex cursor-pointer select-none items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <EyeClosed className="text-slate900_light800 size-3" />
                        ) : (
                          <Eye className="text-slate900_light800 size-3" />
                        )}
                      </div>
                    </>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    className="gray-border text-slate900_light800 rounded-full"
                  />
                </FormControl>
                <FormLabel className="text-slate900_light800 cursor-pointer">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <SubmitFormButton
            isSubmitting={isSubmitting}
            submitLabel="Log in"
            extraElement={
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <Link
                  href="/register"
                  className="text-slate900_light800 text-sm underline"
                >
                  Register
                </Link>
                <Link
                  href="/forgot-password"
                  className="text-slate900_light800 text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
            }
          />
        </form>
      </Form>
    </AuthCard>
  )
}

export default LoginPage
