//ZUSTAND
import { create } from "zustand";
import { persist } from "zustand/middleware"

//I18N
import i18n from "@/shared/lib/i18n/config";

//TOASTS
import { handleToasts } from "@/shared/lib/toast/toastTypes";
import type { TFunction } from "i18next";

type LanguageType = "pt" | "en";

interface LanguageStoreProps {
    language: LanguageType;
    toggleLanguage: () => void;
}

export const languageStore = create<LanguageStoreProps>()(
    persist<LanguageStoreProps>(
        (set) => ({
            language: "pt",
            toggleLanguage: () => set((state) => ({ language: state.language === "pt" ? "en" : "pt" })),
        }),
        {
            name: "language",
        }
    )
)

export const setLang = (t: TFunction, theme: boolean) => {
    const targetLng = languageStore.getState().language === "pt" ? "en" : "pt"
    languageStore.getState().toggleLanguage();
    handleToasts({ message: t("settings.cards.language.message"), theme, type: "info" })
    i18n.changeLanguage(targetLng);
} 