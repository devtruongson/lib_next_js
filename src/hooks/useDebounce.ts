import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number): string => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const id = setTimeout(() => {
            setText(value);
        }, delay);

        return () => clearTimeout(id);
    }, [delay, value]);

    return text.trim();
};
