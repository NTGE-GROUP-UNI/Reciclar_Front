import type { IClassSummary } from "@/entities/classroom/model/types";

export const seletecUniqueClasses = (classes:IClassSummary[] | undefined) => {
    return [...new Set(classes?.map((cl:any) => cl.className.slice(6)) || [])];
}