import { ICategorie, IPaginCom } from "@/utils/interface";
import axios from "./axios";

export const getAllCategory = (data: IPaginCom): Promise<ICategorie> => {
    return axios.get(
        `/cate/filter-pagination?page=${data.page}&pageSize=${data.pageSize}`
    );
};
