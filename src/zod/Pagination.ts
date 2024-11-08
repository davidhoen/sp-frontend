import { z } from "zod";

//Schema for a paging object inside a pager
const pagingMetaObjectSchema = () => z.object({
    current_page: z.number().min(0).default(0),
    last_page: z.number().min(0),
    per_page: z.number().min(1).max(1000).default(10),
    total: z.number().min(0)
});

//Generic schema for pagers (subsets of an array of entities)
//Remember that data must be overwritten by the correct type when using this pager schema
export const pagingSchema = () => z.object({
    meta: pagingMetaObjectSchema(),
    data: z.any()
});

export const pagingParamsSchema = () => pagingMetaObjectSchema().omit({
    last_page: true,
    total: true
})

//Types for schemae
type GenericPagingSchema = z.infer<ReturnType<typeof pagingSchema>>;

export type PagingSchema<T> = Omit<GenericPagingSchema, "data"> & { data: T[] }