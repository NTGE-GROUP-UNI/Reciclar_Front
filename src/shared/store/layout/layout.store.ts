import { create } from "zustand";

interface LayoutProps {
    sideOpen: boolean;
    setSideOpen: () => void
}

export const useLayoutStore = create<LayoutProps>((set) => ({
    sideOpen: false,
    setSideOpen: () => set((state) => ({ sideOpen: !state.sideOpen })),
}));