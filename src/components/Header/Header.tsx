"use client";

import { Fragment, memo, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    ShieldCheckIcon,
    CursorArrowRippleIcon,
    UserCircleIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import SearchInput from "../SearchInput/SearchInput";
import Swal from "sweetalert2";
import { v4 as uuid4 } from "uuid";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

interface IAccountFeature {
    name: string;
    href?: string;
    icon: any;
}

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [accountFeature, setAccountFeature] = useState<IAccountFeature[]>([]);
    const { isLoginIn, logout } = useAuthStore();

    useEffect(() => {
        if (isLoginIn) {
            setAccountFeature([
                {
                    name: "Xem Tài Khoản",
                    href: "/account/profile",
                    icon: UserCircleIcon,
                },
                {
                    name: "Xem Sách Đã Mượn",
                    href: "/account/order",
                    icon: BookOpenIcon,
                },
                {
                    name: "Đăng Xuất",
                    icon: CursorArrowRippleIcon,
                },
            ]);
        } else {
            setAccountFeature([
                {
                    name: "Đăng Nhập",
                    href: "/auth/login",
                    icon: ShieldCheckIcon,
                },
                {
                    name: "Đăng Ký",
                    href: "/auth/register",
                    icon: CursorArrowRippleIcon,
                },
            ]);
        }
    }, [isLoginIn]);

    const handleLogout = async (): Promise<void> => {
        Swal.fire({
            title: "Bạn Chắc Chắn Đăng Xuất?",
            showDenyButton: true,
            confirmButtonText: "Đăng Nhập",
            denyButtonText: `Hủy Bỏ`,
            icon: "info",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex items-center justify-between h-[100px] pr-[20px] md:pr-0 pl-[8px] md:pl-0"
                aria-label="Global"
            >
                <div className="flex lg:flex-0.5">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <div className="flex gap-2 items-center">
                            <Image
                                width={200}
                                height={200}
                                priority
                                className="w-[100px] object-cover"
                                src={
                                    process.env
                                        .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                    "/upload/folder/app/logo.jpg/fe"
                                }
                                alt="Logo Website"
                            />
                            <div>
                                <p className="p-0 m-0 font-[600] text-[14px] italic leading-[14px] bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    Library
                                </p>
                                <p className="p-0 m-0 font-[600] text-[20px] italic leading-[22px] bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                    Fstack
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
                    <div className="w-[400px] relative flex justify-between items-center border-[1px] overflow-hidden border-solid border-[#ccc] rounded-[6px]">
                        <SearchInput />
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <Popover.Button className="outline-none flex items-center justify-end gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                Tài Khoản
                                <ChevronDownIcon
                                    className="h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-[-60%] top-full z-10 mt-3 w-screen max-w-[250px] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="py-1 px-2">
                                        {accountFeature.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <div className="flex  flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon
                                                        className="h-[25px] w-[25px] text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    {item.href ? (
                                                        <Link
                                                            href={item.href}
                                                            className="block font-semibold text-gray-900 text-[16px] whitespace-nowrap"
                                                        >
                                                            {item.name}
                                                            <span className="absolute inset-0" />
                                                        </Link>
                                                    ) : (
                                                        <p
                                                            className="cursor-pointer block font-semibold text-gray-900 text-[16px] whitespace-nowrap"
                                                            onClick={
                                                                handleLogout
                                                            }
                                                        >
                                                            {item.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <Image
                                width={200}
                                height={200}
                                priority
                                className="w-[100px]"
                                src={
                                    process.env
                                        .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                    "/upload/folder/app/logo.jpg/fe"
                                }
                                alt="Logo Website"
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="mt-10">
                                <h4 className="font-[600] text-[15px] mb-2">
                                    Tìm Kiếm Sách
                                </h4>
                                <div className="w-[full] relative flex justify-between items-center border-[1px] overflow-hidden border-solid border-[#ccc] rounded-[6px]">
                                    <SearchInput />
                                </div>
                            </div>
                            {accountFeature.map((item) => {
                                if (item.href) {
                                    return (
                                        <div className="py-6" key={uuid4()}>
                                            <Link
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="py-6"
                                            key={uuid4()}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            <p
                                                onClick={() => {
                                                    handleLogout();
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default memo(Header);
