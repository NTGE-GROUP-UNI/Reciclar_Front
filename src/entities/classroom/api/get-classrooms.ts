import { baseApi } from "@/shared/lib/axios/axios";
import type { IClassSummary } from "../model/types";

export const getClassrooms = async () => {
    const response = await baseApi.get<IClassSummary[]>("/classes/summary");
    return response.data
}
