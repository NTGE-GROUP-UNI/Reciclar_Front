interface TableStudentsProps {
    historical: any[];
}

export const TableStudents = ({ historical }: TableStudentsProps) => {

    const statusColors: Record<string, string> = {
        inativo: "bg-red-300 border-red-500 text-red-800 dark:bg-red-800 dark:border-red-500 dark:text-zinc-50",
        ativo: "bg-green-300 border-green-500 text-green-800 dark:bg-green-800 dark:border-green-500 dark:text-zinc-50",
        alerta: "bg-yellow-300 border-yellow-500 text-yellow-800 dark:bg-yellow-800 dark:border-yellow-500 dark:text-zinc-50",
    }
    
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Aluno
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Turma
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Data do registro
                    </th>
                    <th className="bg-zinc-200 dark:bg-zinc-700 py-2 px-6 text-center dark:text-zinc-50">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:bg-zinc-200 [&>tr:nth-child(odd)]:bg-zinc-100 dark:[&>tr:nth-child(even)]:bg-zinc-800 dark:[&>tr:nth-child(odd)]:bg-zinc-900">
                {
                    historical.map((h, index) => {

                        const { studentName, className, status, createdAt } = h;

                        const date = new Date(createdAt ?? 0);
                        const convertDate = date.toLocaleString("pt-BR", {
                            timeZone: "America/Sao_Paulo"
                        })

                        return (
                            <tr key={index}>
                                <td className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {studentName}
                                </td>
                                <td className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {className?.slice(6)}
                                </td>
                                <td className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    {convertDate.slice(0, 10)}
                                </td>
                                <td className="py-4 px-6 text-center text-zinc-800 dark:text-zinc-400">
                                    <span
                                        className={`
                                            py-1 px-3 rounded-full border
                                            ${statusColors[h?.status.toLowerCase()]}
                                        `}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}