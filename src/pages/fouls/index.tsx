import {
    Button,
    Description,
    Form,
    TitleStructure
} from "@/shared/components/shared"

import { FileText, RefreshCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormData } from "../../shared/components/form/type";
import { motion } from "framer-motion";
import { getStudents } from "@/entities/student/api/get-students";
import { getClassroomsMetrics } from "@/entities/classroom/api/get-classrooms-metrics";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import type { IStudent } from "@/entities/student/model/types";
import { useQuery } from "@tanstack/react-query";

import { TableStudents, CardView } from "./components/export-components";
import { Spinner } from "@/shared/ui/spinner";

export const Fouls = () => {

    const [isFiltred, setIsFiltered] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState<IStudent[] | null>(null);

    const { data: students = [], isFetching } = useQuery({
        queryKey: ["fouls"],
        queryFn: getStudents
    })

    const { data: foulsMetrics } = useQuery({
        queryKey: ["fouls_metrics"],
        queryFn: getClassroomsMetrics
    })

    const { data: classes } = useQuery({
        queryKey: ["fouls_classes_field"],
        queryFn: getClassrooms
    })

    const uniqueClasses = [...new Set(classes?.map((cl) => cl.className.slice(6)) || [])];

    const handleSubmit = (data: FormData) => {
        const { filterName, filterClass, filterShift, filterStatus } = data;

        const condition = filterName || filterClass || filterShift || filterStatus;

        if (condition) {
            const filtered = students?.filter((student) => {
                const matchName = filterName
                    ? student.fullName.toLowerCase().includes(filterName.toLowerCase())
                    : true;

                const matchShift = filterShift
                    ? student?.shift?.toLowerCase().includes(filterShift.toLowerCase())
                    : true;

                const matchClass = filterClass
                    ? student?.className?.slice(6).toLowerCase() === filterClass.toLowerCase()
                    : true;

                const matchStatus = filterStatus
                    ? student.status.toLowerCase().includes(filterStatus.toLowerCase())
                    : true;

                return matchName && matchClass && matchShift && matchStatus;
            });

            setFilteredStudents(filtered);
            setIsFiltered(true);
        }
    };

    const reloadDatas = () => {
        setFilteredStudents(null);
        setIsFiltered(false);
    };

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
                        {
                            isFiltred
                                ?
                                <Description
                                    description="Botão de reinicialização"
                                    dirX="right"
                                    dirY="top"
                                >
                                    <button
                                        type="button"
                                        onClick={reloadDatas}
                                    >
                                        <RefreshCcw
                                            className="
                                            text-zinc-700 
                                            dark:text-zinc-400
                                        "
                                            height={17}
                                            width={17}
                                        />
                                    </button>
                                </Description>
                                :
                                null
                        }
                    </div>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1, ease: "easeIn" }}
                    className="
                        bg-green-500 dark:bg-green-700
                        text-zinc-50 dark:text-zinc-200
                        w-full md:max-w-48 px-2 py-3 rounded-xl
                        flex items-center justify-center gap-2
                    "
                >
                    <FileText /> <span>Exportar Excel</span>
                </motion.button>
            </TitleStructure>

            {foulsMetrics ? (
                <CardView metrics={foulsMetrics} />
            ) : <section className="w-full flex justify-center"><Spinner /></section>}

            <section
                className="
                    w-full hidden lg:flex flex-col
                    gap-6 pb-8
                "
            >
                <Form.Root
                    dir="row"
                    submit={handleSubmit}
                >
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="filterName"
                        >
                            Buscar aluno
                        </Form.Label>
                        <Form.Input
                            id="filterName"
                            zodName="filterName"
                            placeholder="Digite o nome do aluno..."
                        />
                    </Form.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description="Filtro para turma"
                            dirX="right"
                            dirY="top"
                        >
                            <Form.Select.Root
                                zodName="filterClass"
                                defaultValue=""
                            >
                                <Form.Select.Option
                                    disabled
                                    hidden
                                    value=""
                                >
                                    Turma
                                </Form.Select.Option>
                                {
                                    uniqueClasses &&
                                    uniqueClasses.map((className, idx) => {
                                        return (
                                            <Form.Select.Option
                                                key={idx}
                                                value={className}
                                                id={className}
                                            >
                                                {className}
                                            </Form.Select.Option>
                                        )
                                    })
                                }
                            </Form.Select.Root>
                            <SlidersHorizontal
                                className="
                                    text-zinc-900 dark:text-zinc-400
                                    absolute top-[50%] right-3 translate-y-[-50%]
                                    pointer-events-none
                                "
                                height={20}
                                width={20}
                            />
                        </Description>
                    </Form.Select.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description="Filtro para turno"
                            dirX="right"
                            dirY="top"
                        >
                            <Form.Select.Root
                                zodName="filterShift"
                                defaultValue=""
                            >
                                <Form.Select.Option
                                    disabled
                                    hidden
                                    value=""
                                >
                                    Turno
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Manhã"
                                    id="manha"
                                >
                                    Manhã
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Tarde"
                                    id="Tarde"
                                >
                                    Tarde
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Noite"
                                    id="Noite"
                                >
                                    Noite
                                </Form.Select.Option>
                            </Form.Select.Root>
                            <SlidersHorizontal
                                className="
                                text-zinc-900 dark:text-zinc-400
                                absolute top-[50%] right-3 translate-y-[-50%]
                                pointer-events-none
                            "
                                height={20}
                                width={20}
                            />
                        </Description>
                    </Form.Select.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description="Filtrar por status"
                            dirX="right"
                            dirY="top"
                        >
                            <Form.Select.Root
                                zodName="filterStatus"
                                defaultValue=""
                            >
                                <Form.Select.Option
                                    disabled
                                    hidden
                                    value=""
                                >
                                    Status
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Alerta"
                                    id="alerta"
                                >
                                    Alerta
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Ativo"
                                    id="ativo"
                                >
                                    Ativo
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="Inativo"
                                    id="inativo"
                                >
                                    Inativo
                                </Form.Select.Option>
                            </Form.Select.Root>
                            <SlidersHorizontal
                                className="
                                text-zinc-900 dark:text-zinc-400
                                absolute top-[50%] right-3 translate-y-[-50%]
                                pointer-events-none
                            "
                                height={20}
                                width={20}
                            />
                        </Description>
                    </Form.Select.Wrapper>
                    <Button
                        typeButton="default"
                    >
                        Buscar
                    </Button>
                </Form.Root>

                {
                    isFetching
                        ?
                        <div className="animate-pulse space-y-4">
                            <div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded"></div>
                        </div>
                        :
                        students && students.length >= 1 ?
                            <TableStudents students={filteredStudents ?? students ?? []} />
                            :
                            <div
                                className="
                            w-full flex flex-col
                            justify-center items-center
                            mt-6
                        "
                            >
                                <h1
                                    className="
                                text-zinc-600 font-medium leading-normal
                                dark:text-zinc-400 text-xl
                            "
                                >
                                    Ops! Não foi possível encontrar...
                                </h1>
                                <img
                                    src="public/not_found_filter.svg"
                                    alt="Imagem ilustrativa"
                                    className="
                                w-full max-w-md 
                            "
                                />
                            </div>
                }
            </section>
        </div>
    )
}