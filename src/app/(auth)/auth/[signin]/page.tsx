"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import handleValidateForm from "@/helpers/handleValidateForm";
import {
    IDataLoginAndRegister,
    IDataLoginAndRegisterFireBase,
} from "@/utils/interface";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import useAuthStore from "@/stores/authStore";
import firebaseConfig from "../../../../helpers/firebase";

export default function Auth() {
    const [login, setLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userFireBase, setUserFireBase] = useState<boolean>(false);

    const router: AppRouterInstance = useRouter();
    const params: Params = useParams();
    const { loginAction, registerAction, isLoginIn, loginFireBaseAction } =
        useAuthStore();
    const provider = firebaseConfig();

    const handleBackToHome = (): void => {
        router.push("/");
    };

    useEffect(() => {
        document.title = "LibFstack - Tài Khoản";

        if (params.signin === "login") {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [params]);

    const handleSubmit = async () => {
        const arrValidate = [email, password];

        if (!login) {
            arrValidate.push(firstName, lastName);
        }

        const check = handleValidateForm(arrValidate);

        if (!check) return;

        const dataBuilder: IDataLoginAndRegister = {
            email,
            password,
        };

        if (!login) {
            dataBuilder.firstName = firstName;
            dataBuilder.lastName = lastName;
        }

        if (login) {
            await loginAction(dataBuilder);
        } else {
            await registerAction(dataBuilder);
        }
    };

    useEffect(() => {
        if (isLoginIn) {
            handleBackToHome();
            return;
        } else if (!userFireBase) {
            firebase.auth().signOut();
            return;
        }
        const LoginFirebase = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (!user) {
                    return;
                }
                let dataBuider: IDataLoginAndRegisterFireBase = {
                    email: user.email as string,
                    lastName: user.displayName as string,
                    avatar_url: user.photoURL as string,
                };

                await loginFireBaseAction(dataBuider);
            });
        return () => LoginFirebase();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginIn, userFireBase]);

    return (
        <div className="h-[100vh] bg-[#fafafa] flex justify-center items-center relative">
            <Button
                onClick={handleBackToHome}
                type="dashed"
                className="fixed top-[30px] left-[40px]"
            >
                Quay Lại
            </Button>
            <div className="container mx-auto xl:max-w-[1280px] bg-[#fafafa]">
                <Row>
                    <Col span={12}>
                        <div className="mt-[14vh] ml-20">
                            <p className="text-4xl font-[600] leading-[45px]">
                                Chào mừng bạn đến với{" "}
                                <i className="text-bg-liner">LibraryFstack</i>
                            </p>
                            <p className="text-lg my-[20px]">
                                Nơi ẩn chứa các kiến thức mà bạn chắc chắn sẽ
                                cần dùng đến, hãy cùng{" "}
                                <i className="text-bg-liner">LibraryFstack</i>{" "}
                                trải nghiệm ngay nhé!
                            </p>
                            <Image
                                className="h-[40vh] w-[80vh] object-cover"
                                src={
                                    process.env
                                        .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                    "/upload/folder/app/logo_preview.png/fe"
                                }
                                alt="Hình ảnh"
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="h-[90%] w-[70%] ml-[20%] bg-[#fff] mt-[10%] shadow-2xl rounded p-5">
                            <div className="container w-[100%]">
                                <p className="text-[20px] font-medium">
                                    {login ? "Đăng nhập" : "Đăng ký"}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-[25px]">
                                    <div className="">
                                        <button
                                            onClick={() => {
                                                firebase
                                                    .auth()
                                                    .signInWithPopup(
                                                        provider.googleAuth
                                                    );
                                                setUserFireBase(true);
                                            }}
                                            className="w-[100%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                        >
                                            <i className="bi bi-google mr-5 text-blue-300"></i>
                                            Log in with Google
                                        </button>
                                    </div>
                                    <div className="">
                                        <button
                                            onClick={() => {
                                                setUserFireBase(true);
                                                firebase
                                                    .auth()
                                                    .signInWithPopup(
                                                        provider.githubAuth
                                                    );
                                            }}
                                            className="w-[100%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                        >
                                            <i className="bi bi-github mr-5"></i>
                                            Log in with Github
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 gap-4 mt-8">
                                    <div className="w-[100%] col-span-2 h-[1px] border border-[#ccc] mt-3"></div>
                                    <div className="w-[100%] text-center">
                                        hoặc
                                    </div>
                                    <div className="w-[100%] col-span-2 h-[1px] border border-[#ccc] mt-3"></div>
                                </div>

                                <div className="">
                                    <div className="mb-6 my-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                            Email
                                        </label>
                                        <input
                                            value={email}
                                            type="email"
                                            id="email"
                                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập tài email của bạn"
                                            required
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-6 my-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                            Password
                                        </label>
                                        <input
                                            value={password}
                                            type="password"
                                            id="password"
                                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="password"
                                            required
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    {login ? (
                                        <div className="">
                                            <div className="">
                                                <a
                                                    className="text-[blue] float-right mb-[10px]"
                                                    href=""
                                                >
                                                    Quên mật khẩu?
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                    First Name
                                                </label>
                                                <input
                                                    value={firstName}
                                                    type="text"
                                                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="first name"
                                                    required
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                    Last Name
                                                </label>
                                                <input
                                                    value={lastName}
                                                    type="text"
                                                    className="outline-none bg-gray-50 border border-gray-300 text-[#333] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                    placeholder="last name"
                                                    required
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="w-[100%] mt-5">
                                        <Button
                                            className="mt-2 font-bold h-[40px] rounded w-[100%]"
                                            onClick={handleSubmit}
                                        >
                                            {login ? " Đăng nhập" : " Đăng ký"}
                                        </Button>
                                    </div>

                                    <div className="mt-5 flex">
                                        {login
                                            ? "Don’t have an account yet?"
                                            : "have an account yet?"}

                                        <p
                                            className="text-[blue] hover:cursor-pointer"
                                            onClick={() => {
                                                setLogin(!login);
                                            }}
                                        >
                                            {login
                                                ? " (Sign up here)"
                                                : " (Log in here)"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
