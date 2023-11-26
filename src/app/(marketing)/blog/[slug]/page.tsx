import { CopyClipBoard } from "@/components/CopyToClipboard/CopyToClipboard";
import OrderView from "@/components/OrderView/OrderView";
import PreviewImage from "@/components/PreviewImage/PreviewImage";
import RelationBook from "@/components/RelationBook/RelationBook";
import { IBlog, IBook, IRes } from "@/utils/interface";
import { Breadcrumb, Col, Row } from "antd";
import { HttpStatusCode } from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { v4 as uuid4 } from "uuid";

export async function generateStaticParams() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/blog/all-blog`
    );
    const response = await res.json();
    console.log(response);
    const buildSlug = response?.data?.map((item: IBlog) => ({
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
        process.env.NEXT_PUBLIC_BASE_URL + `/blog/by-slug?slug=${slug}`
    );
    const response: IRes<IBook> = await res.json();
    if (response.statusCode === HttpStatusCode.BadRequest) {
        return {
            title: "Trag chi tiết",
        };
    }

    return {
        title: response.data.title,
        openGraph: {
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
        process.env.NEXT_PUBLIC_BASE_URL + `/blog/by-slug?slug=${slug}`
    );
    const response: IRes<IBlog> = await res.json();
    console.log(response);
    if (response.statusCode === HttpStatusCode.BadRequest) {
        return notFound();
    }

    return (
        <div>
            {response?.data && (
                <>
                    <div className="bg-[#fff] rounded-sm shadow-sm px-6 pt-4 pb-8">
                        <Row>
                            <Col span={24}>
                                <h2 className="font-[700] text-2xl">
                                    {response.data.title}
                                </h2>
                                <div
                                    className="mt-4 preview-markdown"
                                    dangerouslySetInnerHTML={{
                                        __html: response.data.contentHTML,
                                    }}
                                ></div>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <RelationBook is_random={false} />
                    </div>
                </>
            )}
        </div>
    );
}
