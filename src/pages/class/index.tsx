import { useParams } from "react-router-dom";
import {
    ModalRegister,
    Card,
    Modal,
    PageTitle
} from "./components/export-components"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/entities/student/api/get-students";
import { ModalDanger } from "./components/modal-danger";
import { ModalEdit } from "./components/modal-edit";

export const ClassPage = () => {

    const { id, shift } = useParams();

    const { data: students = [], isFetching } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getStudents
    })

    const [openModalRegister, setOpenModalRegister] = useState<boolean>(false);
    const [openModalDanger, setOpenModalDanger] = useState<boolean>(false);
    const [openModalQrCode, setOpenModalQrCode] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

    const filteredStudents = students.filter((std) => {
        return std.className?.slice(6) === id && std.shift === shift;
    }) ?? [];

    const skeletonCount = students?.length ?? 4;

    return (
        <div className="
                w-full
                p-8
            ">
            <PageTitle
                classId={String(id)}
                filteredStudents={filteredStudents}
                isFetching={isFetching}
                setOpenModalRegister={setOpenModalRegister}
            />
            <section className="
                    w-full flex flex-col
                    justify-center items-center
                    my-6 gap-8
                ">

                {
                    isFetching
                        ?
                        Array.from({ length: skeletonCount }).map((_, idx) => {
                            return (
                                <div key={idx} className="animate-pulse h-40 w-full space-y-4">
                                    <div className="bg-zinc-300 dark:bg-zinc-800 h-40 w-full rounded">
                                    </div>
                                </div>
                            )
                        })
                        :
                        filteredStudents && filteredStudents.length >= 1 ?
                            filteredStudents.map((student, index) => {
                                return (
                                    <Card
                                        delay={index * 0.2}
                                        setOpenModalDanger={setOpenModalDanger}
                                        setOpenModalQrCode={setOpenModalQrCode}
                                        setOpenModalEdit={setOpenModalEdit}
                                        student={student}
                                        key={index} 
                                    />
                                )
                            })
                            :
                            <div className="
                                w-full flex flex-col
                                justify-center items-center
                                mt-6
                            ">
                                <h1 className="
                                text-zinc-600 font-medium leading-normal
                                dark:text-zinc-400 text-xl text-center
                            ">
                                    Ops! Aluno não foi encontrado...
                                </h1>
                                <img src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1778615035/not_found_filter_iylac4.svg" alt="Imagem ilustrativa" className="
                                    w-full max-w-md
                                " />
                            </div>
                }
            </section>

            { 
                openModalQrCode 
                &&
                <Modal 
                    setOpenModalQrCode={setOpenModalQrCode}
                />
            }

            {
                openModalRegister
                &&
                <ModalRegister
                    shift={String(shift)}
                    id={String(id)}
                    openModalRegister={setOpenModalRegister}
                />
            }


            {
                openModalEdit
                &&
                <ModalEdit
                    setOpenModalEdit={setOpenModalEdit}
                />
            }


            {
                openModalDanger &&
                <ModalDanger 
                    setOpenModalDanger={setOpenModalDanger}
                />
            }
        </div>
    )
}