import { ILink, IMeta, IOrder, IPagin, IRes } from "@/utils/interface";
import axios from "./axios";

export const checkValidOrder = (): Promise<IRes<{ is_valid: boolean }>> => {
    return axios.get("/order/check-isvalid", {
        withCredentials: true,
    });
};

export const createOrderBook = (data: {
    books: number;
}): Promise<IRes<any>> => {
    return axios.post("/order", data, {
        withCredentials: true,
    });
};

export const getAllOrderService = (data: {
    filter: string;
    page: number;
    pageSize: number;
}): Promise<IPagin<IOrder[], IMeta, ILink>> => {
    return axios.get(
        `/order?filter=${data.filter}&page=${data.page}&pageSize=${data.pageSize}`,
        { withCredentials: true }
    );
};
