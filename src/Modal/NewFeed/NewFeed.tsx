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
            <div
                className="fixed w-[40px] left-[12px] hover:cursor-pointer hover:text-[#ee4d2d] h-[40px] flex justify-center items-center rounded-[50%] bg-white shadow-md"
                style={{
                    borderRadius: "50%",
                    width: 40,
                    left: 24,
                    bottom: 60,
                    zIndex: 99,
                }}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                </svg>
            </div>
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
                                href="/about"
                                onClick={() => {
                                    handleCLose();
                                }}
                            >
                                Các Công Nghệ Lib System Sử Dụng 😊
                            </Link>
                        </h4>
                    </div>
                    <div>
                        <h4 className="pb-2 font-[600]">
                            <Link
                                href="/huongdan/muonsach"
                                onClick={() => {
                                    handleCLose();
                                }}
                            >
                                Xem Cách Mượn Sách Trong Lib😉❤️😊
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
