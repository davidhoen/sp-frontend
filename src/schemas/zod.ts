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
