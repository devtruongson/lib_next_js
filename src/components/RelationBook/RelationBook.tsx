"use client";
import usePagination from "@/hooks/usePagination";
import { relationBookService } from "@/services/bookService";
import { IBookShow } from "@/utils/interface";
import { Badge, Button, Col, Row, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { v4 as uuid4 } from "uuid";

const RelationBook: React.FC<{
    is_random: boolean;
}> = ({ is_random = false }) => {
    const params: {
        slug: string;
    } = useParams();

    const { data, handleChangePage, isLoading, meta } =
        usePagination<IBookShow>({
            api: is_random ? () => {} : relationBookService,
            isToken: false,
            page: 1,
            pageSize: 10,
            is_load_more: true,
            conditions: {
                slug: params.slug,
            },
        });

    return (
        <div className="bg-[#fff] rounded-[6px] py-3 px-3 mt-6 shadow-sm">
            <Spin spinning={isLoading} fullscreen />
            <div className="mt-5">
                <h2 className="mt-8 mb-2 text-2xl font-[600] text-[#4d4d4d]">
                    Sách Có Liên Quan
                </h2>
                <div>
                    <Row>
                        {data &&
                            data.length > 0 &&
                            data.map((item) => {
                                return (
                                    <Col
                                        sm={4}
                                        key={uuid4()}
                                        className="h-[260px] px-[10px] py-[10px] w-[100%] hover:translate-y-[-10px] hover:transition-all cursor-pointer"
                                    >
                                        <Badge
                                            count={item.count_borrow_books}
                                            overflowCount={99}
                                            className="w-full"
                                        >
                                            <Badge.Ribbon
                                                text="Top Mượn Nhiều"
                                                placement="start"
                                                className={`text-[11px] ${
                                                    item.count_borrow_books >
                                                    100
                                                        ? ""
                                                        : "hidden"
                                                }`}
                                            >
                                                <Link
                                                    href={`/detail/${item.slug}`}
                                                    className="text-[currentColor]"
                                                >
                                                    <div className="bg-[#fff] shadow-md h-full px-[20px] py-[10px] mx-auto rounded-[7px]">
                                                        <Image
                                                            width={130}
                                                            height={170}
                                                            src={
                                                                process.env
                                                                    .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                                                `/upload/folder/app/${item.thumbnail_url}/book`
                                                            }
                                                            alt="Hình Ảnh Sách Top Mượn"
                                                            className="h-[170px] w-[100%] block object-cover mx-auto rounded-[6px]"
                                                        />
                                                        <div>
                                                            <h2 className="line-clamp-1 font-[600] my-[4px] ">
                                                                {item.title}
                                                            </h2>
                                                            <div
                                                                className="line-clamp-1 text-[12px] pt-[4px]"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.description,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Badge.Ribbon>
                                        </Badge>
                                    </Col>
                                );
                            })}
                        {meta && meta.currentPage < meta.totalPages && (
                            <Col sm={24}>
                                <Button
                                    type="dashed"
                                    className="w-[30%] mx-auto block mt-5"
                                    onClick={() =>
                                        handleChangePage(meta.currentPage + 1)
                                    }
                                >
                                    Xem Thêm
                                </Button>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default RelationBook;
