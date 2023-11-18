"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const NewFeed: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(Math.random() < 0.5);
    }, []);

    const handleCLose = (): void => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal open={isOpen} footer={null} onCancel={handleCLose}>
                <div
                    style={{
                        height: 300,
                        padding: "20px 0",
                    }}
                >
                    <h4 className="pt-3 pb-2 font-[600]">
                        Hãy Đọc Sách Mỗi Ngày
                    </h4>
                    <iframe
                        height="250"
                        className="w-[100%] rounded-sm"
                        src="https://www.youtube.com/embed/XTZVTAS8p8Y"
                        title="Những lợi ích của việc đọc sách | Thanh Đọc Sách | Book Talk"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </Modal>
        </>
    );
};

export default NewFeed;
