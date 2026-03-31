//ZUSTAND
import { create } from "zustand";

//TOASTS
import { handleToasts } from "../../lib/toast/toastTypes";

//I18N
import type { TFunction } from "i18next";

interface UserStoreProps {
    displayName: string;
    changeDisplayName: (name: string) => void
}

export const userStore = create<UserStoreProps>((set) => ({
    displayName: "Reciclar",
    changeDisplayName: (name) => set(() => ({ displayName: name }))
}));

export const setDisplayName = (t:TFunction, name: string, theme: boolean) => {
    handleToasts({ message: t("settings.displayName.message"), theme, type: "success" });
    userStore.getState().changeDisplayName(name);
} 