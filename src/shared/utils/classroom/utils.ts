import type { IClassSummary } from "@/entities/classroom/model/types";

export const seletecUniqueClasses = (classes:IClassSummary[] | undefined) => {
    return [...new Set(classes?.map((cl:any) => cl.className.slice(6)) || [])];
}

export const maskClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/_+/g, "_")
        .toUpperCase()
        .slice(0, 1)

    e.target.value = formattedValue;
}