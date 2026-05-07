import { baseApi } from "@/shared/lib/axios/axios";
import type { IStudent } from "../model/types";

export const getStudents = async () => {
    const response = await baseApi.get<IStudent[]>("/students");
    return response.data;
}