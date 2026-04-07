//ZUSTAND
import { create } from "zustand"

//TOASTS
import { handleToasts } from "../../lib/toast/toastTypes";

// I18N
import type { TFunction } from "i18next";

interface NotificationProps {
    name: string;
    date: string;
    hour: string;
    description: string;
}

interface NotificationStoreProps {
    notifications: NotificationProps[];
    register: (notification: NotificationProps) => void;
    enable: boolean,
    toggleNotification: () => void
}

export const notificationStore = create<NotificationStoreProps>((set) => ({
    notifications: [],
    register: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
    enable: true,
    toggleNotification: () => set((state) => ({ enable: !state.enable }))
}));

export const setNotification = (t: TFunction, theme: boolean) => {  
    notificationStore.getState().enable ? 
        handleToasts({ message: t("settings.cards.notifications.messageDisabled"), theme, type: "warn" }) : 
        handleToasts({ message: t("settings.cards.notifications.messageEnable"), theme, type: "success" })

    notificationStore.getState().toggleNotification();
}