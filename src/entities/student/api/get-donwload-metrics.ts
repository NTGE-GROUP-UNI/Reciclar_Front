import { baseApi } from "@/shared/lib/axios/axios";

export const getDownloadMetrics = async () => {
    const response = await baseApi.get("/dashboard/export",
        {
            responseType: "blob"
        }
    );

    return response.data;
}