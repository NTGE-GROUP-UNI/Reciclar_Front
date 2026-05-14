import { create } from "zustand"
import { persist } from "zustand/middleware"
import { handleToasts } from "@/shared/lib/toast/toast-custom";

interface ThemeStoreProps {
    themeValue: boolean;
    toggleTheme: () => void;
}

export const themeStore = create<ThemeStoreProps>()(
    persist<ThemeStoreProps>((set) => ({
        themeValue: true,
        toggleTheme: () => set((state) => ({ themeValue: !state.themeValue }))
    }),
        {
            name: "theme"
        })
)

export const setTheme = () => {
    handleToasts({ message: "Tema alterado com sucesso!", type: "success" });
    themeStore.getState().toggleTheme();
}
