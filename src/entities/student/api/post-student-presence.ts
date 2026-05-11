import { baseApi } from "@/shared/lib/axios/axios";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

export const postStudentPresence = async (id: string) => {

    const response = await baseApi.post("/attendance", {
        studentId: id,
        type: "entry"
    });

    if (response.status === 201 || response.status === 200) {
        handleToasts({
            message: "Sucesso!",
            theme: true,
            type: "success"
        })
    }

    return response.data;
}