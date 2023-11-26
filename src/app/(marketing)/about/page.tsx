import { Col, Image, Row, Tooltip } from "antd";
import { NextPage } from "next";
import ImageNext from "next/image";
import React from "react";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";

const About: NextPage = () => {
    return (
        <div className="relative mx-auto max-w-7xl px-4 md:px-5">
            <h1 className="mt-4 text-center text-4xl font-extrabold tracking-tight text-slate-700 sm:text-5xl lg:text-6xl">
                Một Thư Viện Mượn Sách Phi Lợi Nhuận{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-3 block">
                    LibFstack
                </span>
            </h1>
            <div className="mt-10">
                <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
                    Một thư viện mượn sách phi lợi nhuận được thiết kế để hỗ trợ
                    cộng đồng và tổ chức phi lợi nhuận trong việc quản lý và
                    chia sẻ tài nguyên sách. Thư viện này cung cấp một nền tảng
                    trực tuyến để người đọc có thể mượn, trao đổi và chia sẻ
                    sách một cách dễ dàng và hiệu quả.{" "}
                    <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-extrabold text-transparent">
                        phi lợi nhuận
                    </span>
                    .
                </p>
            </div>
            <div className="mt-14">
                <h2 className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-3 block text-2xl font-[600]">
                    Công Nghệ Sử Dụng
                </h2>
                <Row className="mt-4" gutter={16}>
                    <Col sm={24}>
                        <div className="flex gap-4 justify-center md:justify-between flex-wrap">
                            <Tooltip title="NextJS">
                                <a href="https://nextjs.org/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="nextJS"
                                        src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
                                        alt="Hình Ảnh"
                                        className="object-container border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="Node.JS">
                                <a href="https://nodejs.org/en">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="Node.JS"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"
                                        alt="Hình Ảnh"
                                        className="object-container border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="FireBase">
                                <a href="https://firebase.google.com/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="FireBase"
                                        src="https://1.bp.blogspot.com/-YIfQT6q8ZM4/Vzyq5z1B8HI/AAAAAAAAAAc/UmWSSMLKtKgtH7CACElUp12zXkrPK5UoACLcB/w1200-h630-p-k-no-nu/image00.png"
                                        alt="Hình Ảnh"
                                        className="object-cover border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="NestJs">
                                <a href="https://nestjs.com/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="NestJs"
                                        src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667"
                                        alt="Hình Ảnh"
                                        className="object-container border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="TypeORM">
                                <a href="https://typeorm.io/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="TypeORM"
                                        src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4"
                                        alt="Hình Ảnh"
                                        className="object-container border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="Docker">
                                <a href="https://www.docker.com/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="Docker"
                                        src="https://s3-ap-southeast-1.amazonaws.com/homepage-media/wp-content/uploads/2021/01/28133406/docker-banner.png"
                                        alt="Hình Ảnh"
                                        className="object-cover border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="MySQL">
                                <a href="https://www.mysql.com/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="MySQL"
                                        src="https://datascientest.com/de/wp-content/uploads/sites/8/2023/02/mysql.webp"
                                        alt="Hình Ảnh"
                                        className="object-cover border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="Nginx">
                                <a href="https://www.nginx.com/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="Nginx"
                                        src="https://guides.wp-bullet.com/wp-content/uploads/2019/08/nginx-custom-http-headers.png"
                                        alt="Hình Ảnh"
                                        className="object-cover border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                            <Tooltip title="TypeScript">
                                <a href="https://www.typescriptlang.org/">
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        title="TypeScript"
                                        src="https://static-00.iconduck.com/assets.00/file-type-typescript-icon-2048x1349-0um6gqic.png"
                                        alt="Hình Ảnh"
                                        className="object-contain border-[1px] border-solid border-[#ccc] rounded-[50%]"
                                    />
                                </a>
                            </Tooltip>
                        </div>
                    </Col>
                    <Col sm={24} className="mt-10">
                        <h3 className="font-[600] text-[18px]">Thông Số</h3>
                        <div className="mt-5">
                            <p className="mx-auto text-sm mb-4 text-justify text-slate-600 dark:text-slate-400">
                                Với{" "}
                                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-extrabold text-transparent">
                                    Next.Js 13
                                </span>
                                Server-side Rendering (SSR): Next.js hỗ trợ SSR
                                mặc định, giúp trang web của bạn có thể tạo ra
                                HTML động tại thời điểm yêu cầu. Điều này cung
                                cấp nội dung tốt hơn cho các công cụ tìm kiếm so
                                với các ứng dụng chỉ sử dụng client-side
                                rendering. Static Site Generation (SSG): Next.js
                                hỗ trợ SSG, cho phép bạn tạo các trang tĩnh tốt
                                cho việc tối ưu hóa SEO. Trang tĩnh có thể được
                                tạo ra tại thời điểm xây dựng, giảm thời gian
                                tải trang và cải thiện hiệu suất. Incremental
                                Static Regeneration (ISR): Next.js 13 giới thiệu
                                ISR, một tính năng cho phép bạn làm mới các
                                trang tĩnh một cách tương đối, giúp cập nhật
                                nhanh chóng thông tin mới trên trang web của bạn
                                mà không cần xây dựng lại toàn bộ trang.
                                Automatic Image Optimization: Next.js cung cấp
                                tối ưu hóa hình ảnh tự động, giúp giảm dung
                                lượng hình ảnh và cải thiện hiệu suất tải trang.
                                Hiệu ứng này có thể tích cực đối với SEO, đặc
                                biệt là trong môi trường di động.
                            </p>
                            <Tooltip title="Khả Năng SEO Đạt Đến 100 Trên Google Perfomance">
                                <ImageNext
                                    src="/imgs/seo100.png"
                                    width={1980}
                                    height={1080}
                                    alt="Hình ẢNh"
                                    className="w-full object-cover rounded-sm"
                                />
                            </Tooltip>
                            <Tooltip title="Thời Gian Tải Trang Chỉ 166mls">
                                <ImageNext
                                    src="/imgs/loadedtime.png"
                                    width={1980}
                                    height={1080}
                                    alt="Hình ẢNh"
                                    className="w-full object-cover rounded-sm mt-4"
                                />
                            </Tooltip>
                            <div className="mt-6">
                                <table className="border-collapse border border-[#ccc] w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-[#ccc]">
                                                Thuộc Tính
                                            </th>
                                            <th className="border border-[#ccc]">
                                                Thông Số
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                Server Side Rendering
                                            </td>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                <CheckBadgeIcon
                                                    width={30}
                                                    hanging={30}
                                                    color="blue"
                                                    className="mx-auto"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                Client Side Rendering
                                            </td>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                <CheckBadgeIcon
                                                    width={30}
                                                    hanging={30}
                                                    color="blue"
                                                    className="mx-auto"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                Single Page App
                                            </td>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                <CheckBadgeIcon
                                                    width={30}
                                                    hanging={30}
                                                    color="blue"
                                                    className="mx-auto"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                Muitiple Page App
                                            </td>
                                            <td className="border border-[#ccc] px-3 py-2">
                                                <XCircleIcon
                                                    width={30}
                                                    hanging={30}
                                                    color="blue"
                                                    className="mx-auto"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default About;
