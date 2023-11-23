import NewFeed from "@/Modal/NewFeed/NewFeed";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NewFeed />
            <div className="bg-[#fff] fixed top-0 right-0 left-0 z-[990] shadow-sm">
                <div className="container mx-auto">
                    <Header />
                </div>
            </div>
            <div className="bg-[#F3F3F7] mt-[100px] py-[20px] px-[8px] md:px-0">
                <div className="container mx-auto">{children}</div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
