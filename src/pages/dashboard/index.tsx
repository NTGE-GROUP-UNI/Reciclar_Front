import {
    TitleStructure,
    Form,
    Button,
    Loader,
    Description
} from "@/shared/components/shared";
import { Card } from "./components/card";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FormData } from "@/shared/components/form/type";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import { getStudentsMetrics } from "@/entities/student/api/get-students-metrics";
import type { IStudent } from "@/entities/student/model/types";
import { useQuery } from "@tanstack/react-query";
import { ExportExcelButton } from "@/shared/components/export-excel/export-excel";
import { useTranslation } from "react-i18next";
import { seletecUniqueClasses } from "@/shared/utils/classroom/utils";

export const Dashboard = () => {

    const { t } = useTranslation();
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
            return;
        }

        const { filterName, filterClass, filterShift } = data;

        const condition = filterName || filterClass || filterShift;

        if (condition && students) {
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
                        {t("dashboard.title")}
                    </h1>
                    <p
                        className="
                        font-medium text-zinc-500 
                        text-md dark:text-zinc-400
                    "
                    >
                        {t("dashboard.description")}
                    </p>
                </div>

                <ExportExcelButton />
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
                            {t("dashboard.labels.searchStudent")}
                        </Form.Label>
                        <Form.Input
                            id="filterName"
                            zodName="filterName"
                            placeholder={t("dashboard.inputs.searchStudentPlaceholder")}
                        />
                    </Form.Wrapper>
                    <Form.Select.Wrapper>
                        <Description
                            description={t("dashboard.inputs.filterClass.description")}
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
                                    {t("dashboard.inputs.filterClass.value")}
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
                            description={t("dashboard.inputs.filterShift.description")}
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
                                    {t("dashboard.inputs.filterShift.value")}
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
                        {!isFiltred ? t("global.buttons.search") : t("global.buttons.loadAgain")}
                    </Button>
                </Form.Root>

                {
                    isLoading
                        ?
                        <div
                            className="
                            flex justify-center items-center
                            w-full pt-60
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
                                            student={student}
                                            key={index}
                                        />
                                    ))
                                }
                            </div>
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
            </div>
        </div>
    )
}