import { baseApi } from "@/shared/lib/axios/axios";
import type { IStudent } from "../model/types";

export const getStudentsMetrics = async () => {
    const response = await baseApi.get<IStudent[]>("/dashboard/students-metrics");
    return response.data;
}