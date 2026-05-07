import type { IStudent } from "@/entities/student/model/types";
import { Clock4 } from "lucide-react";

export interface CardProps {
    student: IStudent;
}

export const Card = ({ student }: CardProps) => {

    const statusColors: Record<string, string> = {
        inativo: "bg-red-300 border-red-500 text-red-800 dark:bg-red-800 dark:border-red-500 dark:text-zinc-50",
        ativo: "bg-green-300 border-green-500 text-green-800 dark:bg-green-800 dark:border-green-500 dark:text-zinc-50",
        alerta: "bg-yellow-300 border-yellow-500 text-yellow-800 dark:bg-yellow-800 dark:border-yellow-500 dark:text-zinc-50",
    }

    return (
        <div
            className="
                w-full sm:max-w-[260px]
                border border-zinc-200 dark:border-zinc-700
                bg-zinc-100 dark:bg-zinc-900
                shadow-sm rounded-lg flex p-4 justify-between
                gap-3 relative
            "
        >
            <span
                className={`
                    absolute right-3 -top-4
                    py-1 px-3 rounded-full
                    border font-medium text-sm
                    ${statusColors[student?.status.toLowerCase()]}
                `}
            >
                {student?.status.charAt(0).toUpperCase() + student?.status.slice(1)}
            </span>
            <div
                className="
                    w-[48px] h-[48px]
                    bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark] 
                    grid place-items-center
                    rounded-full
                "
            >
                <h1
                    className="
                        text-lg font-bold text-zinc-50
                        leading-normal
                    "
                >
                    {student.fullName.slice(0, 2)}
                </h1>
            </div>
            <div
                className="
                    flex flex-col gap-3
                "
            >
                <h1
                    className="
                        text-lg font-medium text-zinc-900
                        leading-normal dark:text-zinc-200
                    "
                >
                    {student.fullName.length > 13 ? `${student.fullName.slice(0, 13)}...` : student.fullName }
                </h1>
                <div
                    className="
                        flex flex-row gap-2
                    "
                >
                    <h2
                        className="
                            text-sm font-medium text-zinc-500
                            leading-normal
                        "
                    >
                        {student?.className?.slice(0,7)}
                    </h2>
                    <span
                        className="
                            text-sm font-medium text-zinc-500
                            leading-normal
                        "
                    >
                        •
                    </span>
                    <div
                        className="
                            flex flex-row gap-1 items-center justify-center
                        "
                    >
                        <Clock4 className="text-zinc-500" height={12} width={12}/>
                        <h2
                            className="
                                text-sm font-medium text-zinc-500
                                leading-normal
                            "
                        >
                            {student.shift}
                        </h2>
                    </div>
                </div>
                <div
                    className="
                        flex flex-row gap-3
                    "
                >
                    <div>
                        <h3
                            className="
                                text-sm font-medium text-zinc-500
                                leading-normal
                            "
                        >
                            Presenças
                        </h3>
                        <h4
                            className="
                                text-md font-bold text-green-500
                                leading-normal
                            "
                        >
                            {student.presences}
                        </h4>
                    </div>
                    <div>
                        <h3
                            className="
                                text-sm font-medium text-zinc-500
                                leading-normal
                            "
                        >
                            Faltas
                        </h3>
                        <h4
                            className="
                                text-md font-bold text-red-500
                                leading-normal
                            "
                        >
                            { student.absences }
                        </h4>
                    </div>
                </div>
                <div
                    className="
                        flex flex-row gap-3
                    "
                >
                    <div>
                        <h3
                            className="
                                text-sm font-medium text-zinc-500
                                leading-normal
                            "
                        >
                            Abonadas
                        </h3>
                        <h4
                            className="
                                text-md font-bold text-yellow-500
                                leading-normal
                            "
                        >
                            { student.justified }
                        </h4>
                    </div>
                    <div>
                        <h3
                            className="
                                text-sm font-medium text-zinc-500
                                leading-normal
                            "
                        >
                            Frequência
                        </h3>
                        <h4
                            className="
                                text-md font-bold text-blue-500
                                leading-normal
                            "
                        >
                            { student.frequency }
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
} 