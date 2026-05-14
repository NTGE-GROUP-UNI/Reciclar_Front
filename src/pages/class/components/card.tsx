import { Clock4, QrCode, Pencil } from 'lucide-react';
import type { IStudent } from '@/entities/student/model/types';
import { motion } from 'framer-motion';
import { useCurrentStudent } from '@/shared/store/student/student.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchStudentStatus } from '@/entities/student/api/patch-student-status';
import { Spinner } from '@/shared/ui/spinner';
import type { SetStateAction } from 'react';

interface CardProps {
    setOpenModalDanger: React.Dispatch<SetStateAction<boolean>>;
    setOpenModalQrCode: React.Dispatch<SetStateAction<boolean>>;
    setOpenModalEdit: React.Dispatch<SetStateAction<boolean>>;
    student: IStudent;
    delay: number;
}

export const Card = ({ 
    student, 
    setOpenModalDanger, 
    setOpenModalQrCode, 
    setOpenModalEdit,
    delay
}: CardProps) => {

    const { changeStudent } = useCurrentStudent();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: patchStudentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] })
        }
    })

    const { isPending } = mutation;

    type handleType = "qrcode" | "danger" | "edit";
    const handleAction = (where: handleType) => {
        const funcs = {
            qrcode: () => setOpenModalQrCode(prev => !prev),
            danger: () => setOpenModalDanger(prev => !prev),
            edit: () => setOpenModalEdit(prev => !prev)
        }

        changeStudent({ ...student });
        
        return funcs[where]();
    }

    const statusColors: Record<string, string> = {
        inativo: "bg-red-300 border border-red-500 text-red-800 dark:bg-red-800 dark:border-red-500 dark:text-zinc-50",
        ativo: "bg-green-300 border border-green-500 text-green-800 dark:bg-green-800 dark:border-green-500 dark:text-zinc-50",
        alerta: "bg-yellow-300 border border-yellow-500 text-yellow-800 dark:bg-yellow-800 dark:border-yellow-500 dark:text-zinc-50",
    }

    const titleStatus = {
        good: "text-green-500 dark:text-green-700",
        bad: "text-red-500 dark:text-red-700",
        warning: "text-yellow-500 dark:text-yellow-700"
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: delay, ease: "easeIn" }}
            className="
                w-full flex flex-col md:flex-row justify-between items-stretch
                border border-zinc-200 rounded-lg
                px-6 py-8 shadow-sm gap-6 dark:border-zinc-600
                bg-zinc-50 dark:bg-zinc-900 relative
            "
        >
            <span
                className={`
                    absolute right-6 -top-4
                    py-1 px-3 rounded-full
                    border font-medium text-sm
                    ${statusColors[student?.status.toLowerCase()]}
                `}
            >
                {student?.status.charAt(0).toUpperCase() + student?.status.slice(1)}
            </span>
            <div
                className="
                    w-[52px] h-[52px]
                    bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark] 
                    grid place-items-center
                    rounded-full flex-shrink-0
                "
            >
                <h1
                    className="
                        text-xl font-bold text-zinc-50
                        leading-normal
                    "
                >
                    {student.fullName.slice(0, 2)}
                </h1>
            </div>
            <div
                className='
                    w-full h-full flex flex-col
                '
            >
                <h1
                    className='
                        text-xl font-medium text-zinc-900
                        leading-normal dark:text-zinc-200
                        mb-1
                    '
                >
                    {student.fullName}
                </h1>
                <div
                    className='
                        flex gap-2
                        items-center
                        mb-4
                    '
                >
                    <Clock4
                        height={20}
                        width={20}
                        className='
                            text-zinc-400
                            dark:text-zinc-500
                        '
                    />
                    <h2
                        className='
                            text-lg font-normal text-zinc-500
                            leading-normal dark:text-zinc-400
                        '
                    >
                        {student.shift}
                    </h2>
                </div>
                <div
                    className='
                        flex w-full
                        gap-8
                    '
                >
                    <div className='flex flex-col md:flex-row gap-2'>
                        <div>
                            <h3 className=" text-md font-normal text-zinc-500 leading-normal dark:text-zinc-400">
                                Presenças
                            </h3>
                            <span
                                className={`text-lg font-normal leading-normal ${titleStatus["good"]}`}
                            >
                                {student.presences}
                            </span>
                        </div>
                        <div>
                            <h3 className=" text-md font-normal text-zinc-500 leading-normal dark:text-zinc-400">
                                Faltas
                            </h3>
                            <span
                                className={`text-lg font-normal leading-normal ${titleStatus["bad"]}`}
                            >
                                {student.absences}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <div>
                            <h3 className=" text-md font-normal text-zinc-500 leading-normal dark:text-zinc-400">
                                Abonadas
                            </h3>
                            <span
                                className={`text-lg font-normal leading-normal ${titleStatus["warning"]}`}
                            >
                                {student.justified}
                            </span>
                        </div>
                        <div>
                            <h3 className=" text-md font-normal text-zinc-500 leading-normal dark:text-zinc-400">
                                Frequência
                            </h3>
                            <span
                                className={`text-lg font-normal leading-normal ${titleStatus["warning"]}`}
                            >
                                {student.frequency}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-end justify-between w-full md:max-w-40 gap-4'>
                <div
                    className='
                        flex md:h-9 gap-3 md:relative absolute top-12 right-8 md:top-0 md:right-0
                    '
                >
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1, ease: "easeIn" }}
                        className="
                        text-zinc-50 dark:text-zinc-200 px-2 
                        rounded-xl hover:bg-zinc-200
                    "
                        onClick={() => handleAction("qrcode")}
                    >
                        <QrCode
                            height={22}
                            width={22}
                            className='
                            text-zinc-800
                            dark:text-zinc-600
                        '
                        />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1, ease: "easeIn" }}
                        className="
                        text-zinc-50 dark:text-zinc-200 px-2 
                        rounded-xl hover:bg-zinc-200
                    "
                        onClick={() => handleAction("edit")}
                    >
                        <Pencil
                            height={22}
                            width={22}
                            className='
                            text-zinc-800
                            dark:text-zinc-600
                        '
                        />
                    </motion.button>
                </div>

                {
                    !isPending ?
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.1, ease: "easeIn" }}
                            className={`
                            px-3 p-2 w-full md:w-auto
                            rounded-xl ${statusColors[student?.status.toLowerCase() === "alerta" || student?.status.toLowerCase() === "ativo" ? "inativo" : "ativo"]}
                        `}
                            onClick={() => handleAction("danger")}
                        >
                            {student?.status.toLowerCase() === "alerta" || student?.status.toLowerCase() === "ativo" ? "Desativar aluno" : "Ativar aluno"}
                        </motion.button>
                        :
                        <Spinner />
                }
            </div>
        </motion.div>
    )
}