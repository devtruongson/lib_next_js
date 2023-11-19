"use client";
import { configApp } from "@/utils/enum";
import { Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const items: TabsProps["items"] = [
    {
        key: configApp.profile,
        label: "Trang Cá Nhân",
    },
    {
        key: configApp.order,
        label: "Sách Đã Mượn",
    },
];

const MenuAccount: React.FC = () => {
    const router = useRouter();
    const pathName = usePathname();

    const onChange = (key: string) => {
        router.push(key);
    };

    return (
        <div>
            <Tabs
                defaultActiveKey={configApp.profile}
                items={items}
                onChange={onChange}
                activeKey={pathName}
            />
        </div>
    );
};

export default MenuAccount;
