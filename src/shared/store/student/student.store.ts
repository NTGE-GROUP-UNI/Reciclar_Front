//ZUSTAND
import { create } from "zustand";

import type { IStudent } from "@/entities/student/model/types";

interface StudentProps {
    student: IStudent | null;
    changeStudent: (student: IStudent) => void;
}

export const useCurrentStudent = create<StudentProps>((set) => ({
    student: null,
    changeStudent: (student) => set((state) => ({ ...state, student: student })),
}));