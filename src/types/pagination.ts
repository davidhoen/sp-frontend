import { CompetencyType } from ".";

// Schema for a paging object inside a pager
export type PagingMetaObject = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    competencies?: CompetencyType[];
};

// Generic schema for pagers (subsets of an array of entities)
// Remember that `data` must be replaced with the correct type when using this pager schema.
export type PagingSchema<T> = {
    meta: PagingMetaObject;
    data: T[];
};

// Parameters for a paging object (without `last_page` and `total` fields)
export type PagingParams = Omit<PagingMetaObject, "last_page" | "total">;

