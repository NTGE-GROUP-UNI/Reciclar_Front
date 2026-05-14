import { Button } from "@/shared/components/shared";
import type { SetStateAction } from "react";
import { useCurrentFoul } from "@/shared/store/foul/foul.store";
import { motion } from "framer-motion";

interface TableStudentsProps {
    historical: any[];
    setOpenModalDanger:  React.Dispatch<SetStateAction<boolean>>;
}

export const TableStudents = ({ historical, setOpenModalDanger }: TableStudentsProps) => {

    const statusColors: Record<string, string> = {
        abonada: "bg-green-300 border-green-500 text-green-800 dark:bg-green-800 dark:border-green-500 dark:text-zinc-50",
        nao_abonada: "bg-yellow-300 border-yellow-500 text-yellow-800 dark:bg-yellow-800 dark:border-yellow-500 dark:text-zinc-50",
    }

    const { changeFoul } = useCurrentFoul((state) => state);

    const handleClickAction = ({ id, name, date, className }: any) => {
        changeFoul({
            id,
            name,
            date,
            className
        })
        setOpenModalDanger(true)
    }
    
    return (
        <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeIn" }} className="w-full">
            <thead>
                <tr>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Aluno
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Turma
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Turno
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Data do registro
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Status
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Ação
                    </th>
                </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-zinc-200 [&>tr:nth-child(odd)]:bg-zinc-100 dark:[&>tr:nth-child(even)]:bg-zinc-800 dark:[&>tr:nth-child(odd)]:bg-zinc-900">
                {
                    historical.map((h, index) => {

                        const { studentName, className, status, createdAt, id, shift } = h;

                        const formatedStatus = h.status.normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                            .replace(/\s+/g, "_");

                        const date = new Date(createdAt ?? 0);
                        const convertDate = date.toLocaleString("pt-BR", {
                            timeZone: "America/Sao_Paulo"
                        })

                        return (
                            <tr key={index}>
                                <td align="center" valign="middle" className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {studentName}
                                </td>
                                <td align="center" valign="middle" className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {className}
                                </td>
                                <td align="center" valign="middle" className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {shift}
                                </td>
                                <td align="center" valign="middle" className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {convertDate.slice(0, 10)}
                                </td>
                                <td align="center" valign="middle" className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    <span
                                        className={`
                                            py-1 px-3 rounded-full border
                                            ${statusColors[formatedStatus]}
                                        `}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </td>
                                <td align="center" valign="middle" className="py-4 px-6 text-zinc-800 dark:text-zinc-400">
                                    <Button
                                        onClick={() => handleClickAction({ id, name: studentName, date: convertDate.slice(0, 10), className: className?.slice(6) })}
                                        type="button"
                                        typeButton="green"
                                        className="w-auto disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-zinc-500 disabled:border-zinc-400"
                                        disabled={formatedStatus !== "nao_abonada"}
                                    >
                                        Abonar falta
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </motion.table>
    )
}