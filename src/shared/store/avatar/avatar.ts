import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

interface PayloadProps {
    colors: string[];
    name: string;
}

interface AvatarStoreProps {
    payload: PayloadProps;
    changeAvatar: (newColors: string[], name: string) => void
}

export const avatarStore = create<AvatarStoreProps>()(
    persist((set) => ({
        payload: {
            colors: ["#0B3C5D", "#1D5F8B", "#3A86B8", "#74B3E7", "#A7D0F5"],
            name: "marble"
        },
        changeAvatar: (newColors: string[], name: string) => set(() => ({
            payload: {
                colors: newColors,
                name: name
            }
        }))
    }),
        {
            name: "avatar"
        })
)

export const setAvatar = ({ colors, name }: PayloadProps) => {
    handleToasts({ message: "Avatar alterado com sucesso!", type: "success" })
    avatarStore.getState().changeAvatar(colors, name);
}