// import CheckCurrentUser from "@/components/CheckCurrentUser/CheckCurrentUser";
import Header from "@/components/Header/Header";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="bg-[#fff] fixed top-0 right-0 left-0 z-[990] shadow-sm">
                <div className="container mx-auto">
                    <Header />
                </div>
            </div>
            <div className="bg-[#F3F3F7] mt-[100px] h-[calc(100vh_-_100px)] py-[20px] overflow-auto">
                <div className="container mx-auto">{children}</div>
            </div>
        </div>
    );
}
