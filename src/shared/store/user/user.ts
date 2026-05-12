import { create } from "zustand";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
import type { TFunction } from "i18next";
import { persist } from "zustand/middleware";

interface UserStoreProps {
    displayName: string;
    changeDisplayName: (name: string) => void
}

export const userStore = create<UserStoreProps>()(
    persist((set) => ({
        displayName: "Reciclar",
        changeDisplayName: (name) => set(() => ({ displayName: name }))
    }), 
    {
        name: "displayName"
    })
);

export const setDisplayName = (t: TFunction, name: string, theme: boolean) => {
    handleToasts({ message: t("settings.cards.displayName.message"), theme, type: "success" });
    userStore.getState().changeDisplayName(name);
} 