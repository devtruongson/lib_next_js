"use client";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HDMuonSach() {
    const Router = useRouter();

    useEffect(() => {
        document.title = "Hướng Dẫn Mượn Sách Tại Thư Viện LibFstack";
    }, []);

    return (
        <div className="bg-[#fff] px-3 py-5 rounded-sm shadow-md">
            <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Hướng Dẫn Mượn Sách Cùng Với Thư Viện LibFstack
            </h1>
            <div className="pt-1 content">
                <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-slate-600 dark:text-slate-400">
                    Do Đây Là Một Tổ Chức Hoàn Toàn Phi Lợi Nhuận Nên Bạn Sẽ
                    Không Mất Bất Kỳ Một Chi Phí Nào Để Mượn Sách Chúng Tôi Chỉ
                    Muốn Mang Đến Cho Bạn Những Kiến Thức Thật Bổ Ích Và Có Hiệu
                    Quả Cho Tương Lai Của Bạn
                </p>
            </div>
            <div className="pb-3 flex justify-center mt-8">
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            Router.push(
                                "https://www.youtube.com/watch?v=FqDua4fi4X8"
                            )
                        }
                    >
                        Xem Video Gặp Offline
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            Router.push(
                                "https://www.youtube.com/watch?v=FqDua4fi4X8"
                            )
                        }
                    >
                        Xem Video Hướng Dẫn
                    </Button>
                </Space>
            </div>
            <div className="flex justify-center py-5">
                <iframe
                    className="rounded-md overflow-hidden w-[70%] h-[400px]"
                    src="https://www.youtube.com/embed/gJgTAIKWDgM"
                    title="Vùng Ký Ức - HippoHappy | The Masked Singer Vietnam 2023 [Audio Lyrics]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="py-5 w-[70%] mx-auto">
                <p className="text-slate-600 dark:text-slate-400 text-sm mx-auto">
                    Khi bạn xem song video trên bạn có thể mượn sách online, hãy
                    lưu ý khi mượn sách song bạn phải đến trung tâm để lấy sách.
                    Một lưu ý nữa là bạn nên đọc các nội quy khi mượn và trả
                    sách
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mx-auto mt-3">
                    Chúng tôi rất mong muốn các đọc giả có thể mang lại cho mình
                    thật nhiều kiến thức, đọc sách nó rất quan trọng trong việc
                    phát triển bản thân và tích lũy kiến thức cho chính mình
                </p>
                <p className="pt-9 flex justify-end italic">Lib Fs</p>
            </div>
        </div>
    );
}
