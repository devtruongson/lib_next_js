"use client";

import { Fragment, memo, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    ShieldCheckIcon,
    CursorArrowRippleIcon,
    UserCircleIcon,
    BookOpenIcon,
    BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import { Button, Input } from "antd";
import SearchInput from "../SearchInput/SearchInput";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const appFeatures = [
    {
        name: "Analytics",
        description: "Get a better understanding of your traffic",
        href: "#",
        icon: ChartPieIcon,
    },
    {
        name: "Engagement",
        description: "Speak directly to your customers",
        href: "#",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Security",
        description: "Your customers’ data will be safe and secure",
        href: "#",
        icon: FingerPrintIcon,
    },
    {
        name: "Integrations",
        description: "Connect with third-party tools",
        href: "#",
        icon: SquaresPlusIcon,
    },
    {
        name: "Automations",
        description: "Build strategic funnels that will convert",
        href: "#",
        icon: ArrowPathIcon,
    },
];

interface IAccountFeature {
    name: string;
    href: string;
    icon: any;
}

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [accountFeature, setAccountFeature] = useState<IAccountFeature[]>([]);

    const { isLoginIn } = useAuthStore();

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
                    href: "/order",
                    icon: BookOpenIcon,
                },
                {
                    name: "Sách Đã Quá Hạn",
                    href: "/order",
                    icon: BookmarkSlashIcon,
                },
                {
                    name: "Đăng Xuất",
                    href: "/auth/register",
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

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex items-center justify-between h-[100px]"
                aria-label="Global"
            >
                <div className="flex lg:flex-0.5">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image
                            width={200}
                            height={200}
                            priority
                            className="w-[100px] object-cover"
                            src={
                                process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                "/upload/folder/app/logo.jpg/fe"
                            }
                            alt="Logo Website"
                        />
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
                                Tính Năng
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
                                <Popover.Panel className="absolute left-[-140%] top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {appFeatures.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <a
                                                        href={item.href}
                                                        className="block font-semibold text-gray-900"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>
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
                                                    <Link
                                                        href={item.href}
                                                        className="block font-semibold text-gray-900 text-[16px] whitespace-nowrap"
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </Link>
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
                            <span className="sr-only">Your Company</span>
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
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Product
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open
                                                            ? "rotate-180"
                                                            : "",
                                                        "h-5 w-5 flex-none"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...appFeatures].map(
                                                    (item) => (
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as="a"
                                                            href={item.href}
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </Disclosure.Button>
                                                    )
                                                )}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default memo(Header);
