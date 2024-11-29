"use client"
import * as Yup from "yup"
import axios, { AxiosError } from "axios"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"

import { useAuth } from "@/hooks/auth"
import ApplicationLogo from "@/components/ApplicationLogo"
import AuthCard from "@/components/AuthCard"
import { Link } from "@/i18n/routing"

interface Values {
  first_name: string
  last_name: string
  email: string
  password: string
  role_id: number
  password_confirmation: string
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/student"
  })

  const submitForm = async (values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>): Promise<any> => {
    try {
      await register(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required("The first name field is required."),
    last_name: Yup.string().required("The last name field is required."),
    email: Yup.string().email("Invalid email").required("The email field is required."),
    password: Yup.string().required("The password field is required."),
    role_id: Yup.number().required("The role field is required."),
    password_confirmation: Yup.string()
      .required("Please confirm password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match.")
  })

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>
      <Formik
        onSubmit={submitForm}
        validationSchema={RegisterSchema}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          role_id: 1,
          password: "",
          password_confirmation: ""
        }}>
        <Form className="space-y-4">
          <div>
            <label htmlFor="first_name" className="undefined block font-medium text-sm text-gray-700">
              First Name
            </label>

            <Field id="first_name" name="first_name" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

            <ErrorMessage name="first_name" component="span" className="text-xs text-red-500" />
          </div>

          <div>
            <label htmlFor="last_name" className="undefined block font-medium text-sm text-gray-700">
              Last Name
            </label>

            <Field id="last_name" name="last_name" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />

            <ErrorMessage name="last_name" component="span" className="text-xs text-red-500" />
          </div>

          <div>
            <label htmlFor="email" className="undefined block font-medium text-sm text-gray-700">
              Email
            </label>

            <Field
              id="email"
              name="email"
              type="email"
              className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <ErrorMessage name="email" component="span" className="text-xs text-red-500" />
          </div>

          <div>
            <label htmlFor="role" className="undefined block font-medium text-sm text-gray-700">
              Role
            </label>

            <Field
              as="select"
              id="role"
              name="role_id"
              className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="1">Student</option>
              <option value="2">Teacher</option>
              <option value="3">Head Teacher</option>
              <option value="4">Admin</option>
            </Field>

            <ErrorMessage name="role_id" component="span" className="text-xs text-red-500" />
          </div>

          <div className="">
            <label htmlFor="password" className="undefined block font-medium text-sm text-gray-700">
              Password
            </label>

            <Field
              id="password"
              name="password"
              type="password"
              className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <ErrorMessage name="password" component="span" className="text-xs text-red-500" />
          </div>

          <div className="">
            <label htmlFor="password" className="undefined block font-medium text-sm text-gray-700">
              Confirm Password
            </label>

            <Field
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <ErrorMessage name="password_confirmation" component="span" className="text-xs text-red-500" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login" className="underline text-sm text-gray-600 hover:text-gray-900">
              Already registered?
            </Link>

            <button
              type="submit"
              className="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default RegisterPage
