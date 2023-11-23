import usePagination from "@/hooks/usePagination";
import { getAllOrderService } from "@/services/orderService";
import { IOrder } from "@/utils/interface";
import { Empty, Pagination, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuid4 } from "uuid";
import { CopyClipBoard } from "../CopyToClipboard/CopyToClipboard";

const OrderAccount: React.FC<{ filter: string }> = ({ filter }) => {
    const { data, handleChangePage, isLoading, meta } = usePagination<IOrder>({
        api: getAllOrderService,
        isToken: true,
        page: 1,
        pageSize: 10,
        conditions: {
            filter,
        },
        is_load_more: false,
    });

    return (
        <div>
            <Spin spinning={isLoading} fullscreen />
            <div className="list">
                {data && data.length > 0 ? (
                    data.map((item) => {
                        return (
                            <div
                                className="item flex gap-2 py-3 hover:bg-[rgba(0,0,0,0.06)] px-2 rounded-sm cursor-pointer"
                                key={uuid4()}
                            >
                                <div className="left flex-shrink-0">
                                    <Image
                                        width={100}
                                        height={100}
                                        className="w-[100px] h-[100px] object-cover"
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                            `/upload/folder/app/${item.book.thumbnail_url}/book`
                                        }
                                        alt="Hình Ảnh Mượn Sách"
                                    />
                                </div>
                                <div className="right flex-1 flex-shrink-0">
                                    <h4 className="text-[16px] font-[600] line-clamp-2">
                                        <Link
                                            href={`/detail/${item.book.slug}`}
                                        >
                                            {item.book.title}
                                        </Link>
                                    </h4>
                                    <div className="py-2">
                                        <table className="border-collapse border border-[#ccc] min-w-[50%]">
                                            <tbody>
                                                <tr>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        Mã Order
                                                    </td>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        <CopyClipBoard
                                                            is_render_children
                                                            text={item.id}
                                                        >
                                                            <strong>
                                                                {item.id}
                                                            </strong>
                                                        </CopyClipBoard>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        Thời Gian Mượn
                                                    </td>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        {new Date(
                                                            item.time_order
                                                        ).toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        Thời Gian Hết Hạn
                                                    </td>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        {new Date(
                                                            item.expire_give_book
                                                        ).toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        Trạng Thái Trả Sách
                                                    </td>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        {item.is_give_book_back
                                                            ? "Đã Trả"
                                                            : "Chưa Trả"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        Sách Đã Quá Hạn
                                                    </td>
                                                    <td className="border border-[#ccc] px-2 py-1">
                                                        {new Date(
                                                            item.expire_give_book
                                                        ).getTime() -
                                                            new Date().getTime() >
                                                        0 ? (
                                                            "Chưa Hết Hạn Mượn"
                                                        ) : (
                                                            <span className="text-[#ee4d2d]">
                                                                Đã Hết Hạn Mượn
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="pt-5">
                        <Empty description="Không Có Sách Mượn" />
                    </div>
                )}
            </div>
            {meta && meta.totalPages > 1 && (
                <div className="py-4 flex justify-center">
                    <Pagination
                        total={meta.totalItems}
                        current={meta.currentPage}
                        pageSize={10}
                        onChange={(page: number) => {
                            handleChangePage(page);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default OrderAccount;
