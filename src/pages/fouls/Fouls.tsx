/*=========== SHARED COMPONENTS ===========*/
import { 
    TitleStructure,
} from "@/components/shared/shared";

/*=========== REACT ===========*/
import { useEffect, useState, useTransition } from "react";

/*=========== LUCIDE REACT (LIB) ===========*/
import { FileText } from "lucide-react";

/*=========== SERVICE ===========*/
import { getStudents } from "@/service/students/students";

/*=========== INTERFACES ===========*/
import type { IStudent } from "@/service/students/interfaces";

export const Fouls = () => {

    const [isFiltred, setIsFiltered] = useState(false);
    const [students, setStudents] = useState<IStudent[]>([]);
    const [cacheStudents, setCacheStudents] = useState<IStudent[]>([]);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await getStudents();
            setStudents(data);
            setCacheStudents(data);
        };
        startTransition(() => fetchStudents());
    },[]);



    return (
        <div
            className="
                w-full
                pt-8 px-8
            "
        >

            <TitleStructure>
                <div>
                    <h1
                        className="
                            font-medium text-zinc-950 
                            text-2xl dark:text-zinc-50
                            mb-2
                        "
                    >
                        Histórico de Faltas
                    </h1>
                    <div
                        className="
                            flex gap-2
                        "
                    >
                        <p
                            className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                        "
                        >
                            Visualize e gerencie todas as faltas registradas
                        </p>
                    </div>
                </div>

                <button
                    className="
                        bg-green-500 dark:bg-green-700
                        text-zinc-50 dark:text-zinc-200
                        w-full max-w-48 px-2 py-3 rounded-xl
                        flex items-center justify-center gap-2
                    "
                >
                    <FileText /> <span>Exportar Excel</span>
                </button>
            </TitleStructure>
        </div>
    )
}