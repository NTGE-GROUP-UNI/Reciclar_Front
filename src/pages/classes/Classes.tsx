/*=========== SHARED COMPONENTS ===========*/
import { 
    TitleStructure,
} from "@/components/shared/shared";

/*=========== REACT ===========*/
import { useEffect, useState, useTransition } from "react";

/*=========== SERVICE ===========*/
import { getStudents } from "@/service/students/students";

/*=========== INTERFACES ===========*/
import type { IStudent } from "@/service/students/interfaces";

export const Classes = () => {

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
                        Gestão de Turmas
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
                            Selecione uma turma para gerenciar os alunos
                        </p>
                    </div>
                </div>
            </TitleStructure>
        </div>
    )
}