import { baseApi } from "@/shared/lib/axios/axios";
import type { IFoulsMetrics } from "../model/types";

export const getClassroomsMetrics = async () => {
    const response = await baseApi.get<IFoulsMetrics>("/attendance/historyfouls");

    return response.data;
}