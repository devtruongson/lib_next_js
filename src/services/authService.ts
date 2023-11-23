import {
    ICurrentUserRole,
    IDataLoginAndRegister,
    IDataLoginAndRegisterFireBase,
    IRes,
    IUser,
} from "@/utils/interface";
import axios from "./axios";

export const loginService = (
    data: IDataLoginAndRegister
): Promise<IRes<{ user: IUser }>> => {
    return axios.post("/auth/login", data, { withCredentials: true });
};

export const loginFireBaseService = (
    data: IDataLoginAndRegisterFireBase
): Promise<IRes<{ user: IUser }>> => {
    return axios.post("/auth/fire-base", data, { withCredentials: true });
};

export const registerService = (
    data: IDataLoginAndRegister
): Promise<IRes<{ user: IUser }>> => {
    return axios.post("/auth/register", data, { withCredentials: true });
};

export const checkCurrentUserService = (): Promise<ICurrentUserRole> => {
    return axios.get("/user/current-role", {
        withCredentials: true,
    });
};

export const logoutService = (): Promise<ICurrentUserRole> => {
    return axios.get("/auth/logout", {
        withCredentials: true,
    });
};

export const refreshTokenService = (): Promise<any> => {
    return axios.post(
        "/auth/refresh-token",
        {},
        {
            withCredentials: true,
        }
    );
};
