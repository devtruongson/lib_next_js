import MenuAccount from "@/components/MenuAccount/MenuAccount";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#fff] px-4  py-4 my-2 rounded-[6px] shadow-sm">
            <MenuAccount />
            {children}
        </div>
    );
}
