//AXIOS
import { baseApi } from "@/lib/axios/axios"

//INTERFACES
import type { IStudent } from "./interfaces"

export const getStudents = async () => {
    const response = await baseApi.get<IStudent[]>("/students");
    return response.data
}