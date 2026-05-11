import {
    Button,
    Description,
    Form,
    TitleStructure
} from "@/shared/components/shared"

import { RefreshCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormData } from "../../shared/components/form/type";
import { getStudents } from "@/entities/student/api/get-students";
import { getClassroomsMetrics } from "@/entities/classroom/api/get-classrooms-metrics";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import type { IStudent } from "@/entities/student/model/types";
import { useQuery } from "@tanstack/react-query";

import { TableStudents, CardView } from "./components/export-components";
import { Spinner } from "@/shared/ui/spinner";
import { ExportExcelButton } from "@/shared/components/export-excel/export-excel";
import { useTranslation } from "react-i18next";
import { seletecUniqueClasses } from "@/shared/utils/classroom/utils";

export const Fouls = () => {

    const { t } = useTranslation();
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

    const uniqueClasses = seletecUniqueClasses(classes);

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
                        {t("fouls.title")}
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
                            {t("fouls.description")}
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

                <ExportExcelButton />
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
                            {t("fouls.labels.searchStudent")}
                        </Form.Label>
                        <Form.Input
                            id="filterName"
                            zodName="filterName"
                            placeholder={t("fouls.inputs.searchStudentPlaceholder")}
                        />
                    </Form.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description={t("fouls.inputs.filterClass.description")}
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
                                    {t("fouls.inputs.filterClass.value")}
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
                            description={t("fouls.inputs.filterShift.description")}
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
                                    {t("fouls.inputs.filterShift.value")}
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
                            description={t("fouls.inputs.filterStatus.description")}
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
                                    {t("fouls.inputs.filterStatus.value")}
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
                        typeButton="blue"
                        className="max-w-24 h-10"
                    >
                        {!isFiltred ? t("global.buttons.search") : t("global.buttons.loadAgain")}
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