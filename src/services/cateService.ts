import { IBookCate, ICategorie, IPaginCom, IRes } from "@/utils/interface";
import axios from "./axios";

export const getAllCategory = (data: IPaginCom): Promise<ICategorie> => {
    return axios.get(
        `/cate/filter-pagination?page=${data.page}&pageSize=${data.pageSize}`
    );
};

export const getAllBookCategory = (
    slug: string
): Promise<IRes<IBookCate[]>> => {
    return axios.get(`/cate/allbook?cate=${slug}`);
};
