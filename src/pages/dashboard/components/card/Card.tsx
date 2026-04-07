//LUCIDE REACT
import { Clock4 } from "lucide-react";

//INTERFACE
import type { CardProps } from "./interface"

export const Card = ({ student }: CardProps) => {
    return (
        <div
            className="
                w-full max-w-[280px]
                border border-zinc-200 dark:border-zinc-700
                bg-zinc-100 dark:bg-zinc-900
                shadow-sm rounded-lg flex p-4 justify-between
                gap-3
            "
        >
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
                    {student.name.slice(0, 2)}
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
                    {student.name.slice(0, 17)}...
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
                        {student.class}
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
                            {student.shiftClass}
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
                            {student.presence}
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
                            {student.fouls}
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
                            {student.abandoned}
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
                            {student.frequency.toFixed(2)}%
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
} 