import { IBookShow, ILink, IMeta, IPagin, IPaginCom } from "@/utils/interface";
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
