"use client";
import { useDebounce } from "@/hooks/useDebounce";
import usePagination from "@/hooks/usePagination";
import { searchBookService } from "@/services/bookService";
import { getAllCategory } from "@/services/cateService";
import { useAppStore } from "@/stores/appStore";
import { IBook, ICategorie } from "@/utils/interface";
import {
    Badge,
    Button,
    Checkbox,
    Col,
    Empty,
    Pagination,
    Radio,
    RadioChangeEvent,
    Row,
    Spin,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuid4 } from "uuid";

const Search: NextPage = () => {
    const [filterBookStock, setFilterBookStock] = useState<"true" | "false">(
        "true"
    );
    const [cateFilter, setCateFilter] = useState<number[] | "all">("all");
    const [isReload, setIsReload] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const Router = useRouter();
    const { updateTextSearch, updateOpenResultSearch, textSearch } =
        useAppStore();
    const { data, handleChangePage, isLoading, meta } =
        usePagination<ICategorie>({
            api: getAllCategory,
            isToken: false,
            is_load_more: true,
            page: 1,
            pageSize: 10,
        });

    const debounceValue = useDebounce(textSearch, 500);
    const {
        data: dataResult,
        handleChangePage: handleChangePageResult,
        meta: metaResult,
        isLoading: loading,
    } = usePagination<IBook>({
        api: searchBookService,
        is_load_more: false,
        page: 1,
        pageSize: 10,
        isToken: false,
        is_reload: isReload,
        conditions: {
            q: debounceValue,
            cate: Array.isArray(cateFilter)
                ? JSON.stringify(cateFilter)
                : cateFilter,
            is_stock: filterBookStock,
        },
        search_reload: debounceValue,
        is_search: true,
    });

    useEffect(() => {
        const searchText: string = searchParams.get("q") || "";
        updateTextSearch(searchText.trim());
    }, [searchParams, updateTextSearch]);

    useEffect(() => {
        if (debounceValue) {
            Router.replace(`/search?q=${debounceValue}`);
        }
    }, [debounceValue, Router]);

    const handleChangeRadio = (e: RadioChangeEvent) => {
        setFilterBookStock(e.target.value);
    };

    const handleChangeCheckBox = (e: CheckboxValueType[]): void => {
        const dataCate = e as number[];
        setCateFilter(dataCate);
    };

    const options = useMemo(() => {
        return data.map((item) => ({
            value: item.id,
            label: item.title,
        }));
    }, [data]);

    return (
        <div>
            <Row gutter={16}>
                <Col sm={6}>
                    <Spin spinning={isLoading}>
                        <div className="py-2">
                            <strong>LỌC THEO DANH MỤC</strong>
                        </div>
                        <Checkbox.Group
                            className="grid grid-cols-2 max-h-[400px] overflow-auto gap-y-2"
                            onChange={handleChangeCheckBox}
                            options={options}
                        ></Checkbox.Group>
                        {meta && meta.currentPage < meta.totalPages && (
                            <div className="flex justify-center py-4 w-full">
                                <Button
                                    onClick={() => {
                                        handleChangePage(meta.currentPage + 1);
                                    }}
                                >
                                    Xem Thêm
                                </Button>
                            </div>
                        )}
                        <div className="mt-3">
                            <div className="py-2">
                                <strong>LỌC THEO SỐ LƯỢNG</strong>
                            </div>
                            <Radio.Group
                                value={filterBookStock}
                                onChange={handleChangeRadio}
                            >
                                <div className="grid grid-cols-2">
                                    <Radio value="true">Tất Cả</Radio>
                                    <Radio value="false">Sách Còn</Radio>
                                </div>
                            </Radio.Group>
                        </div>
                        <div className="mt-3">
                            <div className="py-2">
                                <strong>Hành Động</strong>
                            </div>
                            <Button
                                className="w-full"
                                type="primary"
                                onClick={() => setIsReload(!isReload)}
                            >
                                Áp Dụng Lọc
                            </Button>
                        </div>
                    </Spin>
                </Col>
                <Col sm={18} className="bg-[#fff] shadow-sm rounded-[6px]">
                    {loading && (
                        <Spin
                            spinning={loading}
                            className="w-full h-full flex justify-center items-center z-9999"
                        ></Spin>
                    )}
                    {dataResult && dataResult.length > 0 ? (
                        <div>
                            {dataResult.map((book) => {
                                return (
                                    <Link
                                        key={uuid4()}
                                        href={`/detail/${book.slug}`}
                                        as={`/detail/${book.slug}.html`}
                                        className="text-[currentColor] flex justify-between py-2 px-3 max-h-[115px] overflow-hidden rounded-[5px] gap-3 my-4 mx-4 border-[1px] border-solid border-[#ccc]"
                                    >
                                        <Badge.Ribbon
                                            text="Mới"
                                            placement="start"
                                            className={`text-[11px]`}
                                            color="#ee4d2d"
                                        >
                                            <Image
                                                className="object-cover h-[100px] w-[100px] rounded-[10px]"
                                                width={200}
                                                height={200}
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                                    `/upload/folder/app/${book.thumbnail_url}/book`
                                                }
                                                alt="Hình Ảnh Sách"
                                            />
                                        </Badge.Ribbon>
                                        <div className="flex-1">
                                            <h4 className="font-[600] line-clamp-1 px-2">
                                                {book.title}
                                            </h4>
                                            <p>{book.meta_description}</p>
                                            <div
                                                className="preview-markdown line-clamp-1"
                                                dangerouslySetInnerHTML={{
                                                    __html: book.description,
                                                }}
                                            ></div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-[100%] flex justify-center items-center">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    )}
                    <div className="flex justify-center items-center py-3">
                        {dataResult.length > 0 &&
                            metaResult &&
                            metaResult.currentPage <= metaResult.totalPages && (
                                <Pagination
                                    defaultCurrent={1}
                                    current={metaResult.currentPage}
                                    total={metaResult.totalItems}
                                    onChange={(page: number) =>
                                        handleChangePageResult(page)
                                    }
                                />
                            )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Search;
