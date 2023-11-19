"use client";

import { getBookNewService } from "@/services/bookService";
import { IBookShow, ILink, IMeta, IPagin } from "@/utils/interface";
import { Badge, Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

const BookNews: React.FC = () => {
    const [books, setBooks] = useState<IBookShow[]>([]);

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            try {
                const Res: IPagin<IBookShow[], IMeta, ILink> =
                    await getBookNewService(1, 10);

                if (Res.items) {
                    setBooks(Res.items);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetch();
    }, []);

    return (
        <div className="rounded-[10px] shadow-sm overflow-hidden new-books-slider item-slider flex justify-center py-[1px] px-[1px] w-full max-h-[250px]">
            <div className="w-[6%] flex-shrink-0 flex justify-center items-center">
                <h5 className="rotate-[-90deg] text-white text-[20px] font-bold whitespace-nowrap italic">
                    Sách Mới Cập Nhật
                </h5>
            </div>
            <div className="bg-[#fff] w-[94%] flex-shrink-0">
                <Carousel
                    autoplay
                    speed={1500}
                    className="w-[100%]"
                    slidesToShow={5}
                >
                    {books &&
                        books.length > 0 &&
                        books.map((book) => (
                            <Link
                                key={uuid4()}
                                href={`/detail/${book.slug}`}
                                className="text-[currentColor]"
                            >
                                <div className="px-[12px] py-[10px]">
                                    <div className="flex justify-center items-center h-[230px]">
                                        <Badge.Ribbon
                                            text="Mới"
                                            placement="start"
                                            className={`text-[11px]`}
                                            color="#ee4d2d"
                                        >
                                            <div className="h-[200px] max-w-[140px] overflow-auto no-scrollbar shadow-md px-[6px] py-[5px] pt-[8px] border-[1px] border-solid border-[#eee]">
                                                <Image
                                                    className="object-cover h-[80%] rounded-[10px]"
                                                    width={200}
                                                    height={200}
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                                        `/upload/folder/app/${book.thumbnail_url}/book`
                                                    }
                                                    alt="Hình Ảnh Sách"
                                                />
                                                <div>
                                                    <h4 className="font-[600] line-clamp-1 px-2">
                                                        {book.title}
                                                    </h4>
                                                    <div
                                                        className="preview-markdown line-clamp-6"
                                                        dangerouslySetInnerHTML={{
                                                            __html: book.description,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </Badge.Ribbon>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default BookNews;
