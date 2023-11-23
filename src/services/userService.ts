import { IRes, IUpdateProfile, IUploadImage, IUser } from "@/utils/interface";
import axios from "./axios";

export const getCurrentUserService = (): Promise<IUser> => {
    return axios.get("/user/current-user", {
        withCredentials: true,
    });
};

export const checkProfileServiceValid = (): Promise<boolean> => {
    return axios.get("/user/check-profile-valid", {
        withCredentials: true,
    });
};

export const updateUserService = (data: IUpdateProfile): Promise<IRes<any>> => {
    return axios.put("/user", data, {
        withCredentials: true,
    });
};

export const uploadImageService = (data: IUploadImage): Promise<IRes<any>> => {
    return axios.post("/upload", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
