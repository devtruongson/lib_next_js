import {
    IBook,
    IBookShow,
    ILink,
    IMeta,
    IPagin,
    IPaginCom,
    IRes,
    ISearch,
} from "@/utils/interface";
import axios from "./axios";

export const getBookNewService = (
    page = 1,
    pageSize = 10
): Promise<IPagin<IBookShow[], IMeta, ILink>> => {
    return axios.get(`book/news?page=${page}&pageSize=${pageSize}`);
};

export const getBookTopBrowsService = (
    data: IPaginCom
): Promise<IPagin<IBookShow[], IMeta, ILink>> => {
    return axios.get(
        `/book/top-brows?page=${data.page}&pageSize=${data.pageSize}`
    );
};

export const searchBookService = (
    data: ISearch
): Promise<IPagin<IBook[], IMeta, ILink>> => {
    return axios.get(
        `/book/search-books?q=${data.q}&cate=${data.cate}&is_stock=${data.is_stock}&page=${data.page}&pageSize=${data.pageSize}`
    );
};

export const relationBookService = (data: {
    slug: string;
    page: number;
    pageSize: number;
}): Promise<IPagin<IBookShow[], IMeta, ILink>> => {
    return axios.get(
        `/book/get-book-relation?slug=${data.slug}&page=${data.page}&pageSize=${data.pageSize}`
    );
};
