"use client";
import { Divider, Modal } from "antd";
import Link from "next/link";
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
                        padding: "4px 0",
                    }}
                    className="max-h-[50vh] overflow-y-auto"
                >
                    <div>
                        <h4 className="pb-2 font-[600]">
                            <Link
                                href="/huongdan/muonsach"
                                onClick={() => {
                                    handleCLose();
                                }}
                            >
                                Xem Cách Mượn Sách Trong 😉❤️😊
                            </Link>
                        </h4>
                    </div>
                    <Divider />
                    <div>
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
                        <p className="text-slate-600 dark:text-slate-400 text-sm mx-auto mt-3">
                            Chúng tôi rất mong muốn các đọc giả có thể mang lại
                            cho mình thật nhiều kiến thức, đọc sách nó rất quan
                            trọng trong việc phát triển bản thân và tích lũy
                            kiến thức cho chính mình
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default NewFeed;
