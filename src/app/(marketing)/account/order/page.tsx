"use client";
import OrderAccount from "@/components/OrderAccount/OrderAccount";
import { Tabs, TabsProps } from "antd";
import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const items: TabsProps["items"] = [
    {
        key: "/account/order?filter=all",
        label: "Tất Cả Sách Đã Mượn",
        children: <OrderAccount filter="all" />,
    },
    {
        key: "/account/order?filter=not-expires",
        label: "Sách Mượn Còn Hạn",
        children: <OrderAccount filter="not-expires" />,
    },
    {
        key: "/account/order?filter=expires",
        label: "Sách Đã Hết Hạn",
        children: <OrderAccount filter="expires" />,
    },
];

const Order: NextPage = () => {
    const Router = useRouter();
    const handleChangeTabFilter = (key: string) => {
        Router.push(key);
    };

    return (
        <div className="min-h-[40vh]">
            <Tabs
                defaultActiveKey="1"
                items={items}
                style={{
                    height: "100%",
                    overflow: "hidden",
                }}
                onChange={handleChangeTabFilter}
            />
        </div>
    );
};

export default Order;
