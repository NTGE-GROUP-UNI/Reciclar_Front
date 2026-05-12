import { getDownloadMetrics } from "@/entities/student/api/get-donwload-metrics";
import { FileText } from "lucide-react"
import { Button } from "../shared";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";

export const ExportExcelButton = () => {

    const { t } = useTranslation();

    const downloadSpreadsheet = async () => {
        const data = await getDownloadMetrics();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'dashboard_alunos.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const mutation = useMutation({
        mutationFn: downloadSpreadsheet
    })

    return (
        <Button
            typeButton="green"
            whileTap={{ scale: 0.95 }}
            onClick={() => mutation.mutate()}
            transition={{ duration: 0.1, ease: "easeIn" }}
            className="
                w-full sm:max-w-48
            "
        >
            {
                mutation.isPending
                ?
                <Spinner />
                :
                <>
                    <FileText /> <span>{t("global.buttons.excel")}</span>
                </>
            }
            
        </Button>
    )
}