import { IRes } from "@/utils/interface";
import axios from "./axios";

export const checkValidOrder = (): Promise<IRes<{ is_valid: boolean }>> => {
    return axios.get("");
};
