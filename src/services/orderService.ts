import { IRes } from "@/utils/interface";
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
