/*=========== SHARED COMPONENTS ===========*/
import { 
    TitleStructure,
} from "@/components/shared/shared";

export const Classes = () => {

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