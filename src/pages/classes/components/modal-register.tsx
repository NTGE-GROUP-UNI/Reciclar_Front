import React, { type SetStateAction } from "react";
import { X } from "lucide-react";
import { Button, Form } from "@/shared/components/shared";
import { Spinner } from "@/shared/ui/spinner";
import type { FormData } from "@/shared/components/form/type";
import { postClassroom } from "@/entities/classroom/api/post-classroom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { maskClassName } from "@/shared/utils/classroom/utils";
import { ModalStructure } from "@/shared/components/modal-structure/modal-structure";

export const ModalRegister = ({ setModalRegister }: { setModalRegister: React.Dispatch<SetStateAction<boolean>> }) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postClassroom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            setModalRegister(false);
        }
    })

    const handleSubmit = (data: FormData) => {
        const condition = data.shift && data.name;

        if (condition) {
            const { name, shift } = data;
            mutation.mutate({
                targetClass: {
                    name: `Turma ${name?.trim()}`,
                    shift,
                }
            });
        }
    }

    return (
        <ModalStructure>
            <div
                className="
                    w-full flex justify-center
                    items-center border-b border-zinc-200 dark:border-zinc-800
                "
            >
                <div
                    className="
                        w-full flex justify-between
                        p-8 items-center
                    "
                >
                    <h1
                        className="
                            font-medium text-zinc-950
                            text-xl dark:text-zinc-50
                        "
                    >
                        Cadastre uma nova turma!
                    </h1>
                    <button
                        onClick={() => setModalRegister(prev => !prev)}
                        className="
                            bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-800
                            transition-colors duration-150 p-1 rounded-lg
                        "
                    >
                        <X
                            className="
                                text-zinc-900 dark:text-zinc-50
                            "
                            height={20}
                            width={20}
                        />
                    </button>
                </div>
            </div>

            <div
                className="
                    w-full px-8 py-4
                "
            >
                <Form.Root
                    dir="col"
                    submit={handleSubmit}
                >
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="name"
                        >
                            Nome
                        </Form.Label>
                        <Form.Input
                            onChange={maskClassName}
                            id="name"
                            zodName="name"
                            name="name"
                            placeholder="Digite o nome da turma"
                            type="text"
                        />
                    </Form.Wrapper>
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="shift"
                        >
                            Turno
                        </Form.Label>
                        <Form.Select.Root
                            zodName="shift"
                            defaultValue=""
                            id="shift"
                        >
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
                    </Form.Wrapper>

                    <Button
                        typeButton="blue"
                    >
                        {
                            mutation.isPending
                                ?
                                <Spinner
                                    height={28}
                                    width={28}
                                />
                                :
                                "Cadastrar"
                        }
                    </Button>
                </Form.Root>
            </div>
        </ModalStructure>
    )
}