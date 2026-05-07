//ZUSTAND
import { create } from "zustand"
import { persist } from "zustand/middleware"

//TOASTS
import { handleToasts } from "@/shared/lib/toast/toastTypes";

//I18N
import type { TFunction } from "i18next";

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

export const setTheme = (t: TFunction, theme: boolean) => {
    handleToasts({ message: t("settings.cards.theme.message"), theme, type: "success" });
    themeStore.getState().toggleTheme();
}
