import {
    Button,
    Description,
    Form,
    TitleStructure
} from "@/shared/components/shared"

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormData } from "../../shared/components/form/type";
import { getClassroomsMetrics } from "@/entities/classroom/api/get-classrooms-metrics";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import type { IStudent } from "@/entities/student/model/types";
import { useQuery } from "@tanstack/react-query";
import { TableStudents, CardView } from "./components/export-components";
import { Spinner } from "@/shared/ui/spinner";
import { ExportExcelButton } from "@/shared/components/export-excel/export-excel";
import { useTranslation } from "react-i18next";
import { seletecUniqueClasses } from "@/shared/utils/classroom/utils";
import { getAbsencesHistory } from "@/entities/attendance/api/get-absences-history";
import { motion } from "framer-motion";

export const Fouls = () => {

    const { t } = useTranslation();
    const [isFiltred, setIsFiltered] = useState(false);
    const [filteredHistory, setFilteredHistory] = useState<IStudent[] | null>(null);

    const { data: history = [], isFetching } = useQuery({
        queryKey: ["fouls"],
        queryFn: getAbsencesHistory
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

        if (isFiltred) {
            reloadDatas();
            return;
        }

        const { filterName, filterClass, filterShift, filterStatus } = data;

        const condition = filterName || filterClass || filterShift || filterStatus;

        if (condition) {
            const filtered = history?.filter((h:any) => {
                const matchName = filterName
                    ? h?.studentName.fullName.toLowerCase().includes(filterName.toLowerCase())
                    : true;

                /*const matchShift = filterShift
                    ? student?.shift?.toLowerCase().includes(filterShift.toLowerCase())
                    : true;*/

                const matchClass = filterClass
                    ? h?.className?.slice(6).toLowerCase() === filterClass.toLowerCase()
                    : true;

                const matchStatus = filterStatus
                    ? h?.status.toLowerCase().includes(filterStatus.toLowerCase())
                    : true;

                return matchName && matchClass  && matchStatus;
            });

            console.log(filtered);

            setFilteredHistory(filtered);
            setIsFiltered(true);
        }
    };

    const reloadDatas = () => {
        setFilteredHistory(null);
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
                    </div>
                </div>

                <ExportExcelButton />
            </TitleStructure>

            {foulsMetrics ? (
                <CardView metrics={foulsMetrics} />
            ) : <section className="w-full flex justify-center"><Spinner className="text-zinc-700 dark:text-zinc-200"/></section>}

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
                        className="md:w-auto md:h-10 px-3"
                    >
                        {!isFiltred ? t("global.buttons.search") : t("global.buttons.uploadAgain")}
                    </Button>
                </Form.Root>

                {
                    isFetching
                        ?
                        <div className="animate-pulse space-y-4">
                            <div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded"></div>
                        </div>
                        :
                        history && history.length >= 1 ?
                            <TableStudents historical={filteredHistory ?? history ?? []} />
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
                                    {t("fouls.errors.notFound")}
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
            </section>
        </div>
    )
}