//ZUSTAND
import { create } from "zustand";

interface IFoul {
    id: string | null;
    name: string | null;
    date: string | null;
    className: string | null;
}

interface FoulProps {
    foul: IFoul | null;
    changeFoul: ({}: IFoul) => void;
}

export const useCurrentFoul = create<FoulProps>((set) => ({
    foul: null,
    changeFoul: ({ id, name, className, date }: IFoul) => set((state) => ({ ...state, foul: { id, name, className, date } })),
}));