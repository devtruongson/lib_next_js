"use client";

import useAuthStore from "@/stores/authStore";
import { configApp } from "@/utils/enum";
import { Button, Divider, Spin, Typography } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const { Paragraph } = Typography;

const CheckRoleCurrent: React.FC = () => {
    const { is_verify_email, updateVerifyEmail, isLoginIn } = useAuthStore();
    const search = useSearchParams();

    useEffect(() => {
        if (!isLoginIn) {
            window.location.href = "/auth/login";
        }

        const fetch = async (): Promise<void> => {
            await updateVerifyEmail();
        };
        fetch();
    }, [updateVerifyEmail, is_verify_email, search, isLoginIn]);

    return (
        <>
            {search.get("token") === configApp.token_refresh ? (
                <div className="fixed h-[100vh] w-[100vw] z-[99999999] top-0 left-0 right-0 bottom-0 bg-[#fff] flex justify-center items-center">
                    <Spin />
                </div>
            ) : (
                <div className="fixed h-[100vh] w-[100vw] z-[99999999] top-0 left-0 right-0 bottom-0 bg-[#fff] flex justify-center items-center">
                    <div className="text-center">
                        <div className="text-center flex justify-center items-center mb-[30px] relative">
                            <Image
                                priority
                                width={400}
                                height={400}
                                className="h-[20vh] object-contain"
                                src={
                                    process.env
                                        .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                    "/upload/folder/app/logo_preview.png/fe"
                                }
                                alt="Hình ảnh"
                            />
                            <span className="absolute bottom-[0px] right-[31%] text-[16px] font-[bold]">
                                <i className="text-bg-liner">LibraryFstack</i>
                            </span>
                        </div>
                        <h1 className="text-[50px] font-[700]">
                            Bạn Hãy Kiểm Tra Email Của Mình
                        </h1>

                        <Paragraph className="mt-4">
                            Do Email Của Bạn Chưa Được Xác Thực Chúng Tôi Mới
                            Gửi Một Đường Link Đính Kèm Vào Email Của Bạn Bạn
                            Hãy Kiểm Tra Chúng Và Xác Nhận Sau Đó Hệ Thống Sẽ Tự
                            Động Bỏ Qua Bước Này!
                            <Divider />
                            Nếu Bạn Xác Nhận Bằng Thiết Bị Khác Hoặc Trình Duyệt
                            Khác Vui Lòng Click Xuống Dưới Để Bỏ Qua Bước Này!
                            <br />
                            Hoặc Nếu Email Của Bạn Gặp Vấn Đề Trục Trặc Bạn Có
                            Thể Click Vào Đăng Xuất Để Có Thể Tiếp Tục Xem Các
                            Loại Sách Và Sau Đó Bạn Có Thể Đăng Nhập Lại
                        </Paragraph>
                        <div className="flex  justify-center gap-5">
                            <Button type="primary">Đăng Xuất</Button>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Đã Xác Thực
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckRoleCurrent;
