import { baseApi } from "@/shared/lib/axios/axios";
import type { IDeleteClassroom } from "../model/types";

export const deleteClassroom = async ({ data }: { data: IDeleteClassroom }) => {

    const { id } = data;

    const response = await baseApi.delete(`/classes/${id}`);

    return response.data;
}