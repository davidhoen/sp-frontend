export interface UserType {
    id: string
    email: string
    first_name: string
    last_name: string
    role_id?: string
    image?: string
    role: Role
    personal_coach?: UserType;
    job_title?: string;
    address?: string;
    field?: string;
    is_teacher: boolean
    is_head_teacher: boolean
    is_admin: boolean
}

export interface UserInputType {
    first_name: string
    last_name: string
    email: string
    role_id: number
    password: string
    password_confirmation: string
}

export type Role = {
    id: number
    name: string
}

export enum RolesEnum {
    "Student" = "student",
    "Teacher" = "teacher",
    "HeadTeacher" = "headTeacher",
    "Admin" = "admin"
}

export interface ApiResponseGet<T> {
    data: T;
}

export interface ApiResponseModify {
    message: string;
    data: {
        id: string;
    };
}

export interface SerializableError {
    success: boolean;
    result: any;
    error: {
        message: string;
        code?: string;
        response?: {
            status: number;
            data: any;
        };
    };
}

export interface ApiResponse<T> {
    success: boolean;
    result: T;
    error?: SerializableError["error"];
    status?: number;
}

export interface ApiPaginationMeta {
    currentPage: number;
    from: number | null;
    lastPage: number;
    links: [
        {
            url: string | null;
            label: string;
            active: boolean;
        },
        {
            url: string | null;
            label: string;
            active: boolean;
        },
        {
            url: null;
            label: string;
            active: boolean;
        },
    ];
    path: string;
    perPage: number;
    to: number | null;
    total: number;
}

export interface ApiResponsePaginated<T> {
    data: T;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: ApiPaginationMeta;
}

export interface Query {
    page: string;
}
