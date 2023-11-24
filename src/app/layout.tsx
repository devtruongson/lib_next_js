import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import "./css/preview_mark_down.css";
import "./css/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LibFstack - Thư Viện Mượn Sách",
    description:
        "LibFstack - Thư viện mượn sách chất lượng, đa dạng và tiện lợi. Khám phá bộ sưu tập sách phong phú, đặt mượn dễ dàng, và trải nghiệm dịch vụ tận tâm tại thư viện của chúng tôi. Hãy đọc sách theo cách mới với LibFstack!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <meta
                name="google-site-verification"
                content="6VLnuCRKAL_sVhqRoOlO4HzmYjf78guJEXX-pOfu3UA"
            />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
