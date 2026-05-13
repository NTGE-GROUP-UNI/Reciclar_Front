import {
    Button,
    Description,
    Form,
    Loader,
    TitleStructure,
} from "@/shared/components/shared";
import { ModalRegister } from "./components/modal-register";
import { useState } from "react";
import { Card } from "./components/card";
import { Plus, SlidersHorizontal } from "lucide-react";
import type { FormData } from "@/shared/components/form/type";
import type { IClassSummary } from "@/entities/classroom/model/types";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import { useQuery } from "@tanstack/react-query";
import { ModalDanger } from "./components/modal-danger";
import { ModalEdit } from "./components/modal-edit";
import { seletecUniqueClasses } from "@/shared/utils/classroom/utils";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Classes = () => {

    const { t } = useTranslation();
    const [isFiltred, setIsFiltered] = useState(false);
    const [filteredClasses, setFilteredClasses] = useState<IClassSummary[] | null>(null);
    const [openModalRegister, setOpenModalRegister] = useState<boolean>(false);
    const [openModalDanger, setOpenModalDanger] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    const { data: classes, isLoading } = useQuery({
        queryKey: ["classes"],
        queryFn: getClassrooms,
    });

    const uniqueClasses = seletecUniqueClasses(classes);
    const list = filteredClasses ?? classes

    const handleSubmit = (data: FormData) => {

        if (isFiltred) {
            reloadDatas();
            return;
        }

        const { filterShift, filterClass } = data;

        const condition = filterShift || filterClass;

        if (condition && classes) {
            const filtered = classes.filter((cl) => {

                const matchShift = filterShift
                    ? cl.shift === filterShift
                    : true;

                const matchClass = filterClass
                    ? cl?.className?.slice(6).toLowerCase() === filterClass.toLowerCase()
                    : true;

                return matchShift && matchClass;
            });

            setFilteredClasses(filtered);
            setIsFiltered(true);
        }
    }

    const reloadDatas = () => {
        setFilteredClasses(null);
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
                        {t("classes.title")}
                    </h1>
                    <p
                        className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                        "
                    >
                        {t("classes.description")}
                    </p>
                </div>

                <Button
                    type="button"
                    typeButton="blue"
                    className="md:max-w-48"
                    onClick={() => setOpenModalRegister(prev => !prev)}
                >
                    <Plus /> <span>{t("classes.buttons.registerClass")}</span>
                </Button>
            </TitleStructure>

            <Form.Root
                dir="row"
                submit={handleSubmit}
            >
                <Form.Select.Wrapper>
                    <Description
                        description={t("classes.inputs.filterClass.description")}
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
                                {t("classes.inputs.filterClass.value")}
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
                        description={t("classes.inputs.filterShift.description")}
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
                                {t("classes.inputs.filterShift.value")}
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
                    {!isFiltred ? t("global.buttons.search") : t("global.buttons.uploadAgain")}
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
                    (
                        list && list.length >= 1 ?
                            <div
                                className="
                py-8 flex flex-row flex-wrap gap-6
            "
                            >

                                {
                                    list.map((cl, index) => {
                                        return (
                                            <Card
                                                setOpenModalDanger={setOpenModalDanger}
                                                setOpenModalEdit={setOpenModalEdit}
                                                classroom={cl}
                                                key={index}
                                            />
                                        )
                                    })
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
                                    {t("classes.errors.notFound")}
                                </h1>
                                <img
                                    src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1778615035/not_found_filter_iylac4.svg"
                                    alt="Imagem ilustrativa"
                                    className="
                                    w-full max-w-md 
                                "
                                />
                            </motion.div>
                    )
            }

            {openModalRegister && <ModalRegister setModalRegister={setOpenModalRegister} />}
            {openModalDanger && <ModalDanger setOpenModalDanger={setOpenModalDanger} />}
            {openModalEdit && <ModalEdit setOpenModalEdit={setOpenModalEdit} />}
        </div>
    )
}