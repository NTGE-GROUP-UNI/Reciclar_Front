import {
    TitleStructure,
    Form,
    Button,
    Loader,
    Description
} from "@/shared/components/shared";
import { Card } from "./components/card";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormData } from "@/shared/components/form/type";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import { getStudentsMetrics } from "@/entities/student/api/get-students-metrics";
import type { IStudent } from "@/entities/student/model/types";
import { useQuery } from "@tanstack/react-query";
import { ExportExcelButton } from "@/shared/components/export-excel/export-excel";
import { seletecUniqueClasses } from "@/shared/utils/classroom/utils";
import { motion } from "framer-motion";
import { getDownloadMetrics } from "@/entities/student/api/get-donwload-metrics";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

export const Dashboard = () => {
    const [isFiltred, setIsFiltered] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState<IStudent[] | null>(null);

    const { data: students, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getStudentsMetrics
    })

    const { data: classes } = useQuery({
        queryKey: ["dashboard_classes_field"],
        queryFn: getClassrooms
    })

    const uniqueClasses = seletecUniqueClasses(classes);
    const list = filteredStudents ?? students

    const handleSubmit = (data: FormData) => {

        if (isFiltred) {
            reloadDatas();
            handleToasts({
                message: "Alunos atualizados!",
                type: "success"
            })
            return;
        }

        const { filterName, filterClass, filterShift } = data;

        const condition = filterName || filterClass || filterShift;

        if(!students) return;

        if (condition && students.length > 1) {
            const filtered = students.filter((student) => {
                const matchName = filterName
                    ? student.fullName.toLowerCase().includes(filterName.toLowerCase())
                    : true;

                const matchShift = filterShift
                    ? student?.shift?.toLowerCase().includes(filterShift.toLowerCase())
                    : true;

                const matchClass = filterClass
                    ? student?.className?.slice(6).toLowerCase() === filterClass.toLowerCase()
                    : true;

                return matchName && matchClass && matchShift;
            });

            setFilteredStudents(filtered);
            setIsFiltered(true);
            handleToasts({
                message: "Busca foi concluída!",
                type: "success"
            })
        }

        if (students.length <= 1) {
            handleToasts({
                message: "O filtro não pode ser aplicado para apenas um registro...",
                type: "info"
            })
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
                p-8
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
                        Painel
                    </h1>
                    <p
                        className="
                        font-medium text-zinc-500 
                        text-md dark:text-zinc-400
                    "
                    >
                        Gerenciamento de alunos e frequência
                    </p>
                </div>

                <ExportExcelButton
                    name="dashboard_students"
                    fn={getDownloadMetrics}
                />
            </TitleStructure>

            <div
                className="
                    w-full flex flex-col
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
                            disabled={isFiltred && true}
                            id="filterName"
                            zodName="filterName"
                            placeholder="Digite o nome do aluno"
                        />
                    </Form.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description="Filtrar por turma"
                            dirX="right"
                            dirY="top"
                        >
                            <Form.Select.Root
                                zodName="filterClass"
                                defaultValue=""
                                disabled={isFiltred && true}
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
                            description="Filtrar por turno"
                            dirX="right"
                            dirY="top"
                        >
                            <Form.Select.Root
                                zodName="filterShift"
                                defaultValue=""
                                disabled={isFiltred && true}
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
                    <Button
                        typeButton="blue"
                        className="md:w-auto md:h-10 px-3"
                    >
                        {!isFiltred ? <>Buscar <Search /></> : <>Carregar novamente <RotateCcw /></>}
                    </Button>
                </Form.Root>

                {
                    isLoading
                        ?
                        <div
                            className="
                            flex justify-center items-center
                            w-full pt-8 md:pt-60
                        "
                        >
                            <Loader />
                        </div>
                        :
                        list && list.length >= 1 ?
                            <div
                                className="
                                py-8 flex flex-row flex-wrap gap-6 
                                justify-center md:justify-start
                            "
                            >

                                {
                                    list.map((student, index) => (
                                        <Card
                                            delay={index * 0.05}
                                            student={student}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: [0, 0.71, 0.2, 1.01],
                                }}
                                className="
                                    w-full flex flex-col
                                    justify-center items-center
                                    mt-6
                                "
                            >
                                <h1
                                    className="
                                        text-zinc-600 font-medium leading-normal
                                        dark:text-zinc-400 text-xl text-center
                                    "
                                >
                                    Não foi possível encontrar o aluno...
                                </h1>
                                <img
                                    src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1778615035/not_found_filter_iylac4.svg"
                                    alt="Imagem ilustrativa"
                                    className="
                                        w-full max-w-md 
                                    "
                                />
                            </motion.div>
                }
            </div>
        </div>
    )
}