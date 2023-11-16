import { Tooltip } from "antd";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CopyClipBoard({ text }: { text: string }) {
    const [isCopy, setIsCopy] = useState<boolean>(false);

    return (
        <CopyToClipboard text={text} onCopy={() => setIsCopy(true)}>
            <Tooltip
                title={
                    isCopy ? "Đã Copy vào clipboard" : "Nhấn vào đây để copy"
                }
            >
                <p className="font-[600] text-[14px] pt-1">{text}</p>
            </Tooltip>
        </CopyToClipboard>
    );
}
