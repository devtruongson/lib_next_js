"use client";
import { Tooltip } from "antd";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CopyClipBoard({
    text,
    children,
    is_render_children = false,
}: {
    text: any;
    children: React.ReactNode;
    is_render_children: boolean;
}) {
    const [isCopy, setIsCopy] = useState<boolean>(false);

    return (
        <CopyToClipboard text={text} onCopy={() => setIsCopy(true)}>
            <Tooltip
                title={
                    isCopy ? "Đã Copy vào clipboard" : "Nhấn vào đây để copy"
                }
            >
                {is_render_children ? (
                    children
                ) : (
                    <p className="font-[600] text-[14px] pt-1">{text}</p>
                )}
            </Tooltip>
        </CopyToClipboard>
    );
}
