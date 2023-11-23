"use client";
import { getAllBookCategory } from "@/services/cateService";
import { IBookCate } from "@/utils/interface";
import { Badge, Button, Col, Row, Spin } from "antd";
import { HttpStatusCode } from "axios";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

const CategorieBook: NextPage = () => {
    const [books, setBooks] = useState<IBookCate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params: { slug: string } = useParams();
    const router = useRouter();

    useEffect(() => {
        const _fetch = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const Res = await getAllBookCategory(params.slug);
                if (Res.statusCode === HttpStatusCode.Ok) {
                    setBooks(Res.data);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        _fetch();
    }, [params]);

    const handleBack = (): void => {
        router.back();
    };

    return (
        <div>
            <Spin spinning={isLoading} fullscreen />
            <div className="flex justify-between items-center py-3 bg-white px-3 rounded-sm shadow-sm">
                <h2 className="text-xl font-[600] text-[#4d4d4d]">
                    Sách Trong Danh Mục
                </h2>
                <Button onClick={handleBack}>Quay Lại</Button>
            </div>
            <div className="bg-white shadow-sm rounded-sm mt-4 py-3 px-2">
                <Row>
                    {books &&
                        books.length > 0 &&
                        books.map((item) => {
                            return (
                                <Col
                                    sm={4}
                                    key={uuid4()}
                                    className="h-[260px] px-[10px] py-[10px] w-[100%] hover:translate-y-[-10px] hover:transition-all cursor-pointer"
                                >
                                    <Badge
                                        count={item.book.count_borrow_books}
                                        overflowCount={99}
                                        className="w-full"
                                    >
                                        <Badge.Ribbon
                                            text={item.cate.title}
                                            placement="start"
                                            className={`text-[9px]`}
                                        >
                                            <Link
                                                href={`/detail/${item.book.slug}`}
                                                className="text-[currentColor]"
                                            >
                                                <div className="bg-[#fff] shadow-md h-full px-[20px] py-[10px] mx-auto rounded-[7px]">
                                                    <Image
                                                        width={130}
                                                        height={170}
                                                        src={
                                                            process.env
                                                                .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                                            `/upload/folder/app/${item.book.thumbnail_url}/book`
                                                        }
                                                        alt="Hình Ảnh Sách Top Mượn"
                                                        className="h-[170px] w-[100%] block object-cover mx-auto rounded-[6px]"
                                                    />
                                                    <div>
                                                        <h2 className="line-clamp-1 font-[600] my-[4px] ">
                                                            {item.book.title}
                                                        </h2>
                                                        <div
                                                            className="line-clamp-1 text-[12px] pt-[4px]"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item
                                                                    .book
                                                                    .description,
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
                </Row>
            </div>
        </div>
    );
};

export default CategorieBook;
