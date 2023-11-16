"use client";
import { IImageBook } from "@/utils/interface";
import Image from "next/image";
import React from "react";
import Slider, { Settings } from "react-slick";
import { Image as ImageAntd } from "antd";
import { v4 as uuid4 } from "uuid";

const PreviewImage: React.FC<{ data: string[] }> = ({ data }) => {
    const settings: Settings = {
        customPaging: function (i: number) {
            return (
                <a className="w-[25px] h-[25px] block border-[2px] border-solid border-[#ccc] overflow-hidden rounded-[3px]">
                    <Image
                        style={{
                            width: "25px !important",
                            height: "25px !important",
                            maxWidth: "25px !important",
                            maxHeight: "25px !important",
                        }}
                        width={25}
                        height={25}
                        src={
                            process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION +
                            `/upload/folder/app/${data[i]}/book`
                        }
                        alt="Hình ảnh sách preview dots"
                        className="object-cover"
                    />
                </a>
            );
        },
        arrows: false,
        dots: true,
        dotsClass: "slick-dots slick-thumb slick-custom-paging-preview-image",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <Slider {...settings}>
                {data &&
                    data.length > 0 &&
                    data.map((item) => (
                        <div key={uuid4()}>
                            <div className="flex justify-center items-center item-preview-image">
                                <ImageAntd
                                    src={
                                        process.env
                                            .NEXT_PUBLIC_BASE_URL_PRODUCTION +
                                        `/upload/folder/app/${item}/book`
                                    }
                                    alt="Hình ảnh sách"
                                    className="w-[210px] object-cover"
                                />
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default PreviewImage;
