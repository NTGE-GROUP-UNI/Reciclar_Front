import { FileText } from "lucide-react"
import { Button } from "../shared";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";

interface ExportExcelButtonProps {
    fn: () => any;
    name: string;
}

export const ExportExcelButton = ({ fn, name }:ExportExcelButtonProps) => {

    const downloadSpreadsheet = async () => {
        const data = await fn();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}.xlsx`);
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
                    <FileText /> <span>Exportar Excel</span>
                </>
            }
            
        </Button>
    )
}