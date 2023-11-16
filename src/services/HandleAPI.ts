import { AxiosError } from "axios";
import { logoutService, refreshTokenService } from "./authService";

let isRefreshing = false; // Đánh dấu xem việc làm mới token đã được gọi chưa
let refreshPromise: Promise<any> | null = null; // Lưu trữ promise để đợi cho đến khi token được làm mới

export async function HandleApi(api: Function, data?: any) {
    try {
        return await api(data);
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = refreshTokenService(); // Lưu trữ promise của refreshToken
                await refreshPromise; // Đợi cho đến khi token mới được làm mới
                refreshPromise = null; // Đặt lại promise
                isRefreshing = false;
                return await api(data);
            } else if (refreshPromise) {
                await refreshPromise;
                return await api(data);
            } else {
                // Xử lý lỗi khi không có promise refreshToken
                console.error("Lỗi không có promise refreshToken");
                await handleLogout();
            }
        } else {
            return Promise.reject(error);
        }
    }
}

async function handleLogout(refreshError?: AxiosError) {
    await logoutService();
    window.location.href = "/auth/login";
    localStorage.clear();
    return Promise.reject(refreshError);
}
