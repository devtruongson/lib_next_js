"use client";
import MenuAccount from "@/components/MenuAccount/MenuAccount";
import { HandleApi } from "@/services/HandleAPI";
import { checkCurrentUserService } from "@/services/authService";
import useAuthStore from "@/stores/authStore";
import { ICurrentUserRole } from "@/utils/interface";
import { useEffect, useState } from "react";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isValid, setIsValid] = useState<boolean>(false);
    const { logout, isLoginIn } = useAuthStore();

    useEffect(() => {
        if (!isLoginIn) {
            window.location.href = "/auth/login";
            return;
        }

        const _fetch = async (): Promise<void> => {
            try {
                const Res: ICurrentUserRole = await HandleApi(
                    checkCurrentUserService
                );
                if (Res) {
                    if (!Res.is_verify_email) {
                        window.location.href = "/verify";
                    } else {
                        setIsValid(true);
                    }
                }
            } catch (error) {
                console.log(error);
                logout();
                window.location.href = "/auth/login";
            }
        };
        _fetch();
    }, [logout, isLoginIn]);

    return (
        <div className="bg-[#fff] px-4  py-4 my-2 rounded-[6px] shadow-sm">
            <MenuAccount />
            {isValid && children}
        </div>
    );
}
