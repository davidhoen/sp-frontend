import * as z from "zod"

export const endorsementSchema = z.object({
    requestTitle: z.string().min(1),
    supervisorName: z.string().min(1),
    supervisorPosition: z.string().min(1),
    supervisorCompany: z.string().min(1),
    rating: z.number().min(1).max(4),
    feedback: z.string().min(10),
})

export type EndorsementFormValues = z.infer<typeof endorsementSchema>

export const LoginRequest = z.object({
    email: z.coerce
        .string()
        .email()
        .min(1),
    password: z.coerce
        .string()
        .min(1),
    remember: z.coerce
        .boolean()
        .default(false)
});

export const BaseUserSchema = z.object({
    first_name: z.string().min(1, "First name is required."),
    last_name: z.string().min(1, "Last name is required."),
    email: z.coerce
        .string()
        .email("Invalid email format."),
    role_id: z.number().int("Role ID must be an integer."),
});

const PasswordSchema = z.object({
    password: z.coerce
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .refine((value) => /[a-zA-Z]/.test(value), {
            message: "Password must contain at least one character.",
        })
        .refine((value) => /[A-Z]/.test(value) && /[a-z]/.test(value), {
            message: "Password must contain at least one uppercase and lowercase character.",
        })
        .refine((value) => /\d/.test(value), {
            message: "Password must contain at least one number.",
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "Password must contain at least one special character.",
        }),
    password_confirmation: z.coerce
        .string()
        .min(8, "Password confirmation must be at least 8 characters long."),
});

export const ValidPasswordSchema = PasswordSchema.superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match.",
            path: ["password_confirmation"],
        });
    }
});

export const RegisterRequest = BaseUserSchema.merge(PasswordSchema);

export const ResetPasswordRequest = z.object({
    email: z.coerce
        .string()
        .email(),
}).merge(PasswordSchema)