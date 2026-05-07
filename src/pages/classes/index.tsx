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
import { Plus, RefreshCcw, SlidersHorizontal } from "lucide-react";
import type { FormData } from "@/shared/components/form/type";
import type { IClassSummary } from "@/entities/classroom/model/types";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ModalDanger } from "./components/modal-danger";
import { ModalEdit } from "./components/modal-edit";

export const Classes = () => {

    const [isFiltred, setIsFiltered] = useState(false);
    const [filteredClasses, setFilteredClasses] = useState<IClassSummary[] | null>(null);
    const [openModalRegister, setOpenModalRegister] = useState<boolean>(false);
    const [openModalDanger, setOpenModalDanger] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    const { data: classes, isLoading } = useQuery({
        queryKey: ["classes"],
        queryFn: getClassrooms,
    });

    const uniqueClasses = [...new Set(classes?.map((cl) => cl.className.slice(6)) || [])];

    const handleSubmit = (data: FormData) => {

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

    const list = filteredClasses ?? classes

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
                        Gestão de Turmas
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
                            Gerenciamento de alunos e frequência
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
                    onClick={() => setOpenModalRegister(prev => !prev)}
                    className="
                        flex-shrink-0
                        bg-blue-400 dark:bg-blue-700
                        border border-blue-700 dark:border-blue-500
                        text-blue-800 dark:text-blue-300
                        w-full sm:max-w-48 px-2 py-3 rounded-xl
                        flex items-center justify-center gap-2
                    "
                >
                    <Plus /> <span>Cadastrar turma</span>
                </motion.button>
            </TitleStructure>

            <Form.Root
                dir="row"
                submit={handleSubmit}
            >
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
                <Button
                    typeButton="default"
                >
                    Buscar
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
                    )
            }

            {openModalRegister && <ModalRegister setModalRegister={setOpenModalRegister} />}
            {openModalDanger && <ModalDanger setOpenModalDanger={setOpenModalDanger} />}
            {openModalEdit && <ModalEdit setOpenModalEdit={setOpenModalEdit} />}
        </div>
    )
}