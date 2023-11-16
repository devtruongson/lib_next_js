import { HttpStatusCode } from "axios";

export interface IDataLoginAndRegister {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface IRes<T> {
    statusCode: HttpStatusCode;
    message: string;
    data: T;
}

export type roleUser = "admin" | "user";

export interface IUser {
    id: number;
    fistName: string;
    lastName: string;
    email: string;
    is_verify_email: boolean;
    role: roleUser;
    slug: string;
    is_login_fire_base: boolean;
}

export interface ICurrentUserRole {
    id: number;
    role: roleUser;
    is_login_fire_base: false;
    is_verify_email: false;
}

export interface IDataLoginAndRegisterFireBase {
    email: string;
    lastName: string;
    avatar_url: string;
}

export interface IBookShow {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    slug: string;
    stock: number;
    count_borrow_books: number;
}

export interface IBook extends IBookShow {
    meta_description: string;
    meta_title: string;
    description_markdown: string;
    is_active: boolean;
    view_book: number;
    images?: IImageBook[];
}

export interface IPagin<T, G, H> {
    items: T;
    meta: G;
    links: H;
}

export interface IMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface ILink {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface IPaginCom {
    page: number;
    pageSize: number;
}

export interface IImageBook {
    id: number;
    link_url: string;
    is_active: boolean;
    destination: string;
}
