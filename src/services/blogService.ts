import { IBlog, ILink, IMeta, IPagin } from "@/utils/interface";
import axios from "./axios";

export const getAllBlogs = (data: {
    page: number;
    pageSize: number;
}): Promise<IPagin<IBlog, IMeta, ILink>> => {
    return axios.get(
        `/blog/client?page=${data.page}&pageSize=${data.pageSize}`
    );
};
