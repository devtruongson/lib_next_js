import { CopyClipBoard } from "@/components/CopyToClipboard/CopyToClipboard";
import OrderView from "@/components/OrderView/OrderView";
import PreviewImage from "@/components/PreviewImage/PreviewImage";
import RelationBook from "@/components/RelationBook/RelationBook";
import { IBook, IRes } from "@/utils/interface";
import { Breadcrumb, Col, Row } from "antd";
import { HttpStatusCode } from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { v4 as uuid4 } from "uuid";

export async function generateStaticParams() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/book/all-books`
    );
    const response = await res.json();
    const buildSlug = response?.data?.map((item: IBook) => ({
        slug: item.slug,
    }));
    return buildSlug;
}

export async function generateMetadata({
    params: { slug },
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const res: Response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/book/detail/${slug}`,
        { next: { tags: ["detail-book"] } }
    );
    const response: IRes<IBook> = await res.json();
    if (response.statusCode === HttpStatusCode.BadRequest) {
        return {
            title: "Trag chi tiết",
        };
    }

    const dataImage =
        response.data.images?.map(
            (item) =>
                process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION +
                `/upload/folder/app/${item.link_url}/book`
        ) || [];

    return {
        title: response.data.title,
        openGraph: {
            images: [
                process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION +
                    `/upload/folder/app/${response.data.thumbnail_url}/book`,
                ...dataImage,
            ],
            title: response.data.title,
        },
        description: response.data.meta_description,
        authors: [
            {
                name: "Truong Son",
            },
            {
                name: "lib Fstack",
                url: "https://lib.fstack.com.vn",
            },
        ],
    };
}

export default async function Detail({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const res: Response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/book/detail/${slug}`,
        { next: { tags: ["detail-book"] } }
    );
    const response: IRes<IBook> = await res.json();
    if (response.statusCode === HttpStatusCode.BadRequest) {
        return notFound();
    }

    const dataImage = response.data.images?.map((item) => item.link_url) || [];
    return (
        <div>
            {response?.data && (
                <>
                    <div className="bg-[#fff] rounded-sm shadow-sm px-6 pt-4 pb-8">
                        <Row>
                            <Col sm={6}>
                                <PreviewImage
                                    data={[
                                        response.data.thumbnail_url,
                                        ...dataImage,
                                    ]}
                                />
                            </Col>
                            <Col sm={18}>
                                <div className="pt-1 pb-3">
                                    <Breadcrumb
                                        items={[
                                            {
                                                title: (
                                                    <Link href="/">
                                                        Trang Chủ
                                                    </Link>
                                                ),
                                            },
                                            {
                                                title:
                                                    response.data.categories &&
                                                    response.data.categories
                                                        .length > 0 &&
                                                    response.data.categories.map(
                                                        (item) => {
                                                            return (
                                                                <span
                                                                    key={uuid4()}
                                                                    className="py-1 mx-1"
                                                                >
                                                                    <Link
                                                                        href={`/cate/${item.cate.slug}`}
                                                                        className="block decoration-current"
                                                                    >
                                                                        Xin
                                                                        {
                                                                            item
                                                                                .cate
                                                                                .title
                                                                        }
                                                                    </Link>
                                                                </span>
                                                            );
                                                        }
                                                    ),
                                            },
                                            {
                                                title: "Chi Tiết Sách",
                                            },
                                            {
                                                title: (
                                                    <>
                                                        <CopyClipBoard
                                                            is_render_children
                                                            text={`https://lib.fstack.com.vn/detail/${response.data.slug}`}
                                                        >
                                                            <span className="cursor-pointer">
                                                                {
                                                                    response
                                                                        .data
                                                                        .title
                                                                }
                                                            </span>
                                                        </CopyClipBoard>
                                                    </>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>
                                <h1 className="line-clamp-2">
                                    <span className="mb-2 leading-[30px] inline-flex justify-center items-center">
                                        <span className="text-[#fff] bg-[#ee4d2d] px-4 py-[2px] mr-[4px] text-[12px] rounded-[10px]">
                                            Đọc Ngay
                                        </span>
                                    </span>
                                    <span className="text-2xl font-bold leading-[30px]">
                                        {response.data.title}
                                    </span>
                                </h1>
                                <div>
                                    <p className="italic">
                                        {response.data.meta_description}
                                    </p>
                                </div>
                                <div className="rounded-[12px] py-[20px]">
                                    <h4 className="pb-2 font-[600]">
                                        Thông Tin Cơ Bản
                                    </h4>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-[1px] border-solid border-[#ccc]">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Danh Mục
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Lượt Mượn
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Lượt Xem
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Số Sách Còn Lại
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-[1px] border-solid border-[#ccc] rounded-sm">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {response.data
                                                            .categories &&
                                                            response.data
                                                                .categories
                                                                .length > 0 &&
                                                            response.data.categories.map(
                                                                (item) => {
                                                                    return (
                                                                        <div
                                                                            key={uuid4()}
                                                                            className="py-1"
                                                                        >
                                                                            <Link
                                                                                href={`/cate/${item.cate.slug}`}
                                                                                className="block decoration-current"
                                                                            >
                                                                                Xin
                                                                                {
                                                                                    item
                                                                                        .cate
                                                                                        .title
                                                                                }
                                                                            </Link>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {
                                                            response.data
                                                                .count_borrow_books
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            response.data
                                                                .view_book
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            response.data
                                                                .stock_brows
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <OrderView book={response.data} />
                            </Col>
                        </Row>
                    </div>
                    <div className="bg-[#fff] rounded-sm shadow-sm px-6 py-6 mt-6">
                        <h2 className="text-2xl font-[600] italic">
                            Mô Tả Qua Về Sách
                        </h2>
                        <div
                            className="preview-markdown"
                            dangerouslySetInnerHTML={{
                                __html: response?.data?.description,
                            }}
                        ></div>
                    </div>
                    <div>
                        <RelationBook is_random={false} />
                    </div>
                </>
            )}
        </div>
    );
}
