"use client";
import usePagination from "@/hooks/usePagination";
import { getAllBlogs } from "@/services/blogService";
import { IBlog } from "@/utils/interface";
import { Button, Card, Col, Row, Space, Spin } from "antd";
import Link from "next/link";
import React from "react";
import { v4 as uuid4 } from "uuid";

const Blog: React.FC = () => {
    const { data, handleChangePage, isLoading, meta } = usePagination<IBlog>({
        api: getAllBlogs,
        isToken: false,
        page: 1,
        pageSize: 10,
        is_load_more: true,
    });

    console.log(data);

    return (
        <>
            <Spin spinning={isLoading} fullscreen />
            <div className="mt-5">
                <h2 className="mt-8 mb-2 text-2xl font-[600] text-[#4d4d4d]">
                    Một Số Bài Viết Nổi Bật
                </h2>
                <div>
                    <Row>
                        <Col span={24}>
                            {data &&
                                data.length > 0 &&
                                data.map((item) => {
                                    return (
                                        <Link
                                            href={`/blog/${item.slug}`}
                                            key={uuid4()}
                                            className="hover:text-[#ee4d2d]"
                                        >
                                            <Card className="mb-5">
                                                <h3 className="font-[600]">
                                                    {item.title}
                                                </h3>
                                                <div
                                                    className="mt-4 preview-markdown text-[10px] line-clamp-2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.contentHTML,
                                                    }}
                                                ></div>
                                            </Card>
                                        </Link>
                                    );
                                })}
                        </Col>
                        {meta && meta.currentPage < meta.totalPages && (
                            <Col sm={24} span={24}>
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
        </>
    );
};

export default Blog;
