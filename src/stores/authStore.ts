import { HandleApi } from "@/services/HandleAPI";
import {
    checkCurrentUserService,
    loginFireBaseService,
    loginService,
    registerService,
} from "@/services/authService";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
    ICurrentUserRole,
    IDataLoginAndRegister,
    IDataLoginAndRegisterFireBase,
    IRes,
    IUser,
} from "@/utils/interface";
import { HttpStatusCode } from "axios";
import Swal from "sweetalert2";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isLoginIn: boolean;
    is_verify_email: boolean;
    user: null | IUser;
    loginAction: (data: IDataLoginAndRegister) => Promise<void>;
    loginFireBaseAction: (data: IDataLoginAndRegisterFireBase) => Promise<void>;
    registerAction: (userInfo: IDataLoginAndRegister) => Promise<void>;
    logout: () => void;
    updateVerifyEmail: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoginIn: false,
            user: null,
            is_verify_email: false,
            loginAction: async (data) => {
                try {
                    const Res: IRes<{ user: IUser }> = await loginService(data);
                    if (Res.statusCode === HttpStatusCode.Ok) {
                        set((state) => ({
                            ...state,
                            user: Res.data.user,
                            isLoginIn: true,
                            is_verify_email: Res.data.user.is_verify_email,
                        }));
                    }
                } catch (error: any) {
                    Swal.fire(
                        "Ohh",
                        typeof error.response.data.message === "string"
                            ? error.response.data.message
                            : error.response.data.message.join(" "),
                        "info"
                    );
                }
            },
            loginFireBaseAction: async (data) => {
                try {
                    const Res: IRes<{ user: IUser }> =
                        await loginFireBaseService(data);
                    if (Res.statusCode === HttpStatusCode.Ok) {
                        set((state) => ({
                            ...state,
                            user: Res.data.user,
                            isLoginIn: true,
                            is_verify_email: Res.data.user.is_verify_email,
                        }));
                    }
                } catch (error: any) {
                    firebase.auth().signOut();
                    Swal.fire(
                        "Ohh",
                        typeof error.response.data.message === "string"
                            ? error.response.data.message
                            : error.response.data.message.join(" "),
                        "info"
                    );
                }
            },
            registerAction: async (data) => {
                try {
                    const Res: IRes<{ user: IUser }> = await registerService(
                        data
                    );
                    if (Res.statusCode === HttpStatusCode.Ok) {
                        set((state) => ({
                            ...state,
                            user: Res.data.user,
                            isLoginIn: true,
                            is_verify_email: Res.data.user.is_verify_email,
                        }));
                    }
                } catch (error: any) {
                    Swal.fire(
                        "Ohh",
                        typeof error.response.data.message === "string"
                            ? error.response.data.message
                            : error.response.data.message.join(" "),
                        "info"
                    );
                }
            },
            updateVerifyEmail: async (): Promise<void> => {
                try {
                    const Res: ICurrentUserRole = await HandleApi(
                        checkCurrentUserService
                    );
                    if (Res) {
                        if (Res.is_verify_email) {
                            window.location.href = "/";
                        }
                        set((state) => ({
                            ...state,
                            is_verify_email: Res.is_verify_email,
                        }));
                    }
                } catch (error) {
                    console.log(error);
                    set(() => ({
                        isLoginIn: false,
                        user: null,
                        is_verify_email: false,
                    }));
                    window.location.href = "/auth/login";
                }
            },
            logout: () => {
                set(() => ({
                    isLoginIn: false,
                    user: null,
                    is_verify_email: false,
                }));
            },
        }),
        {
            name: "auth",
        }
    )
);

export default useAuthStore;
