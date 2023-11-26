import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import className from "classnames/bind";
import styles from "./home.module.scss";
import BookNews from "../../components/BookNews/BookNews";
import BookTopBrows from "@/components/BookTopBrows/BookTopBrows";
import Blog from "@/components/Blog/Blog";

const cx: Function = className.bind(styles);

export default function HomePage() {
    return (
        <div>
            <Row gutter={16}>
                <Col sm={8} className="mb-4 md:mb-0">
                    <Carousel
                        className="rounded-[14px] overflow-hidden"
                        autoplay
                        speed={1000}
                    >
                        <div className={cx("item-slider")}>
                            <div>
                                <h2 className="font-[600] text-[25px] italic mb-[14px]">
                                    Fstack Lib
                                </h2>
                                <p className="line-clamp-3">
                                    Nếu bạn sinh ra trong nghèo khó đó không
                                    phải là lỗi của bạn, nhưng nếu bạn chết
                                    trong nghèo khó thì đó là lỗi của bạn.
                                </p>
                                <p className="text-right italic mt-[10px] text-[20px] opacity-[0.9]">
                                    Bill Gates
                                </p>
                            </div>
                        </div>
                        <div className={cx("item-slider")}>
                            <div>
                                <h2 className="font-[600] text-[25px] italic mb-[14px]">
                                    Fstack Lib
                                </h2>
                                <p className="line-clamp-3">
                                    Bạn sẽ không làm cho $ 60.000 một năm của
                                    trường trung học. Bạn sẽ không phải là một
                                    phó tổng thống với một điện thoại xe hơi cho
                                    đến khi bạn kiếm được cả hai
                                </p>
                                <p className="text-right italic mt-[10px] text-[20px] opacity-[0.9]">
                                    Bill Gates
                                </p>
                            </div>
                        </div>
                        <div className={cx("item-slider")}>
                            <div>
                                <h2 className="font-[600] text-[25px] italic mb-[14px]">
                                    Fstack Lib
                                </h2>
                                <p className="line-clamp-3">
                                    Flipping bánh mì kẹp thịt không phải là bên
                                    dưới phẩm giá của bạn. Ông bà của bạn có một
                                    từ khác nhau cho hamburger đảo mà họ gọi là
                                    nó cơ hội.
                                </p>
                                <p className="text-right italic mt-[10px] text-[20px] opacity-[0.9]">
                                    Bill Gates
                                </p>
                            </div>
                        </div>
                    </Carousel>
                </Col>
                <Col sm={16}>
                    <BookNews />
                </Col>
            </Row>
            <div>
                <BookTopBrows />
            </div>
            <div className="mt-10">
                <Blog />
            </div>
        </div>
    );
}
