//ZUSTAND
import { create } from "zustand";

import type { IClassSummary } from "@/entities/classroom/model/types";

interface ClassroomProps {
    classroom: IClassSummary | null;
    changeClassroom: (classroom: IClassSummary) => void;
}

export const useCurrentClassroom = create<ClassroomProps>((set) => ({
    classroom: null,
    changeClassroom: (classroom) => set((state) => ({ ...state, classroom: classroom })),
}));