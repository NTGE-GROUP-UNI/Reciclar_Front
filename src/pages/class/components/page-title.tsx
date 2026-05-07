import { TitleStructure } from "@/shared/components/shared";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/shared/ui/spinner";
import { ArrowLeft, Plus } from 'lucide-react';
import { motion } from "framer-motion";
import type { SetStateAction } from "react";
import type { IStudent } from "@/entities/student/model/types";

export interface PageTitleProps {
    filteredStudents: IStudent[],
    classId: string,
    isFetching: boolean,
    setOpenModalRegister: React.Dispatch<SetStateAction<boolean>>
}

export const PageTitle = ({
    filteredStudents,
    classId,
    isFetching,
    setOpenModalRegister
}: PageTitleProps) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/classes", { replace: true });
    }

    const activeList = filteredStudents.filter((std) => std.status.toLowerCase() === "ativo" || std.status.toLowerCase() === "alerta").length
    const disabledList =  filteredStudents.length - activeList;

    return (
        <TitleStructure>
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-4 items-center">
                    <button onClick={handleBack} type="button">
                        <ArrowLeft height={25} width={25} className=" text-zinc-700 dark:text-zinc-400" />
                    </button>
                    <div>
                        <h1 className=" font-medium text-zinc-950  text-2xl dark:text-zinc-50 mb-2">
                            Turma {classId?.toUpperCase()}
                        </h1>
                        <div className="flex gap-1">
                            {
                                isFetching ?
                                    <Spinner height={18} width={18} className="text-zinc-600 dark:text-zinc-300" /> :
                                    <span className="font-bold text-zinc-500 text-md dark:text-zinc-400 leading-normal">
                                        {activeList}
                                    </span>
                            }
                            <p className="font-medium text-zinc-500 text-md dark:text-zinc-400 leading-normal">
                                Alunos <strong>Cadastrados e ativos!</strong>
                            </p>
                        </div>
                        {
                            disabledList >= 1 &&
                            <div className="flex gap-1">
                                {
                                    isFetching ?
                                        <Spinner height={18} width={18} className="text-zinc-600 dark:text-zinc-300" /> :
                                        <span className="font-bold text-zinc-500 text-md dark:text-zinc-400 leading-normal">
                                            {disabledList}
                                        </span>
                                }
                                <p className="font-medium text-zinc-500 text-md dark:text-zinc-400 leading-normal">

                                    {disabledList <= 1 ? <>Aluno <strong>inativo</strong></> : <>Alunos <strong>inativos</strong></>}
                                </p>
                            </div>
                        }
                    </div>
                </div>

                <motion.button whileTap={{ scale: 0.95 }} transition={{ duration: 0.1, ease: "easeIn" }}
                    onClick={() => setOpenModalRegister(prev => !prev)}
                    className="bg-blue-500 dark:bg-blue-700 text-zinc-50 dark:text-zinc-200 w-full max-w-48 px-2 py-3 rounded-xl flex items-center justify-center gap-2">
                    <Plus /> <span>Cadastrar aluno</span>
                </motion.button>
            </div>
        </TitleStructure>
    )
}