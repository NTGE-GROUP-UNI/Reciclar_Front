//ZUSTAND
import { create } from "zustand";
import type { IStudent } from "@/entities/student/model/types";


interface FormStudentProps {
    student: IStudent | null;
    changeStudentEdit: (student: IStudent) => void;
    isOpenEdit: boolean;
    setIsOpenEdit: () => void;
}

export const useFormStudent = create<FormStudentProps>((set) => ({
    student: null,
    changeStudentEdit: (student) => set((state) => ({ ...state, student: student })),
    isOpenEdit: false,
    setIsOpenEdit: () => set((state) => ({ ...state, isOpenEdit: !state.isOpenEdit }))
}));