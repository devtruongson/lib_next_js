import PreviewImage from "@/components/PreviewImage/PreviewImage";
import { IBook, IRes } from "@/utils/interface";
import { Col, Row } from "antd";
import { HttpStatusCode } from "axios";
import { notFound } from "next/navigation";

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

export default async function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const res: Response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/book/detail/${slug}`
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
                                <p>{response.data.meta_description}</p>
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
                </>
            )}
        </div>
    );
}
