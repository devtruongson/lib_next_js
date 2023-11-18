import { create } from "zustand";

export interface appState {
    textSearch: string;
    is_open_result_search: boolean;
    updateTextSearch: (text: string) => void;
    updateOpenResultSearch: (e: boolean) => void;
}

export const useAppStore = create<appState>()((set) => ({
    textSearch: "",
    is_open_result_search: true,
    updateTextSearch: (text) => {
        set((state) => ({
            ...state,
            textSearch: text,
        }));
    },
    updateOpenResultSearch: (e) => {
        set((state) => ({
            ...state,
            is_open_result_search: e,
        }));
    },
}));
