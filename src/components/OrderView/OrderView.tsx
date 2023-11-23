"use client";

import { HandleApi } from "@/services/HandleAPI";
import { checkValidOrder, createOrderBook } from "@/services/orderService";
import { checkProfileServiceValid } from "@/services/userService";
import useAuthStore from "@/stores/authStore";
import { IBook, IRes } from "@/utils/interface";
import { Button, Col, Row } from "antd";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrderView: React.FC<{ book: IBook }> = ({ book }) => {
    const [checkIsValidOrder, setCheckIsValidOrder] = useState<boolean>(false);
    const [checkIsValidProfile, setCheckIsValidProfile] =
        useState<boolean>(false);
    const { isLoginIn } = useAuthStore();

    const Router = useRouter();

    useEffect(() => {
        const _fetch = async (): Promise<void> => {
            const checkLogin = JSON.parse(
                localStorage.getItem("auth") || "null"
            );

            console.log(checkLogin);
            if (
                !checkLogin ||
                !checkLogin.state ||
                !checkLogin.state.isLoginIn
            ) {
                return;
            }

            try {
                const [ResOrder, ResProfile]: IRes<{ is_valid: boolean }>[] =
                    await Promise.all([
                        HandleApi(checkValidOrder),
                        HandleApi(checkProfileServiceValid),
                    ]);

                if (ResOrder.data.is_valid) {
                    setCheckIsValidOrder(true);
                } else {
                    setCheckIsValidOrder(false);
                }
                if (ResProfile.data.is_valid) {
                    setCheckIsValidProfile(true);
                } else {
                    setCheckIsValidProfile(false);
                }
            } catch (error) {
                Swal.fire("Ohh!", "Something went wrong", "info");
            }
        };
        _fetch();
    }, []);

    const handleOrderBook = async (): Promise<void> => {
        if (!isLoginIn) {
            Swal.fire({
                title: "Bạn Phải Đăng Nhập Trước Mới Có Thể Mượn Sách",
                showDenyButton: true,
                confirmButtonText: "Đăng Nhập",
                denyButtonText: `Hủy Bỏ`,
                icon: "info",
            }).then((result) => {
                if (result.isConfirmed) {
                    Router.push("/auth/login");
                }
            });
            return;
        } else if (!checkIsValidOrder) {
            Swal.fire({
                title: "Bạn Đang Còn Sách Mượn Chưa Trả Vui Lòng Kiểm Tra Trong Trang Cá Nhân",
                showDenyButton: true,
                confirmButtonText: "Xem Sách Quá Hạn",
                denyButtonText: `Hủy Bỏ`,
                icon: "info",
            }).then((result) => {
                if (result.isConfirmed) {
                    Router.push("/account/order?bookExpires=true");
                }
            });
            return;
        } else if (!checkIsValidProfile) {
            Swal.fire({
                title: "Bạn chưa hoàn thành hồ sơ cá nhân hãy hoàn thành trước khi mượn",
                showDenyButton: true,
                confirmButtonText: "Xem Profile",
                denyButtonText: `Hủy Bỏ`,
                icon: "info",
            }).then((result) => {
                if (result.isConfirmed) {
                    Router.push("/account/profile");
                }
            });
            return;
        }

        try {
            const Res: IRes<any> = await HandleApi(createOrderBook, {
                books: book.id,
            });
            if (Res.statusCode === HttpStatusCode.Ok) {
                Swal.fire(
                    "Ohh",
                    "Bạn Đã Mượn Thành Công Sách Vui Lòng Kiểm Tra Thông Tin Trong Trang Cá Nhân",
                    "success"
                );
            }
        } catch (error) {
            Swal.fire("Ohh", "Something went wrong", "info");
        }
    };

    return (
        <div className="flex justify-center items-center md:block">
            <Row gutter={16}>
                <Col sm={12}>
                    <Button type="dashed" className="w-full h-[36px]">
                        Sách Đã Mượn
                    </Button>
                </Col>
                <Col sm={12}>
                    <Button
                        type="primary"
                        className="w-full h-[36px]"
                        onClick={handleOrderBook}
                    >
                        Mượn Sách
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default OrderView;
