"use client";
import { useAppStore } from "@/stores/appStore";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React, {
    ChangeEvent,
    KeyboardEventHandler,
    useCallback,
    useEffect,
} from "react";

const SearchInput: React.FC = () => {
    const Router = useRouter();

    const {
        textSearch,
        is_open_result_search,
        updateTextSearch,
        updateOpenResultSearch,
    } = useAppStore();

    const handleRedirect = useCallback(
        (e: KeyboardEvent) => {
            if (e.keyCode === 13) {
                Router.push(`/search?q=${textSearch.trim()}`);
            }
        },
        [textSearch, Router]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleRedirect);
        return () => window.removeEventListener("keydown", handleRedirect);
    }, [handleRedirect]);

    return (
        <>
            <Input
                value={textSearch}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateTextSearch(e.target.value)
                }
                placeholder="Nhập Sách Tìm Kiếm...."
                className="w-[390px] border-none outline-none hover:border-none focus:border-none focus-within:border-none"
            />
            <Button
                type="primary"
                className="flex-1"
                onClick={() => {
                    Router.push(`/search?q=${textSearch.trim()}`);
                }}
            >
                <i className="bi bi-search"></i>
            </Button>
        </>
    );
};

export default SearchInput;
