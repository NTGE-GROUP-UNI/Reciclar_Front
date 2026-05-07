import { baseApi } from "@/shared/lib/axios/axios";
import type { IPutClassroom } from "../model/types";

export const putClassrooms = async ({ data }: { data: IPutClassroom }) => {

    const { id, shift, name } = data;

    console.log(data);

    const response = await baseApi.put(`/classes/${id}`, {
        name,
        shift,
    });

    return response.data;
}