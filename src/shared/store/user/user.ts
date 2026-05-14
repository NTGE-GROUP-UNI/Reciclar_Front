import { create } from "zustand";
import { handleToasts } from "@/shared/lib/toast/toast-custom";
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

export const setDisplayName = (name: string) => {
    handleToasts({ message: "Nome de exibição alterado com sucesso!", type: "success" });
    userStore.getState().changeDisplayName(name);
} 