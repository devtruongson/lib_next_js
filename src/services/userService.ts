import { IRes, IUser } from "@/utils/interface";
import axios from "./axios";

export const getCurrentUserService = (): Promise<IUser> => {
    return axios.get("/user/current-user", {
        withCredentials: true,
    });
};
