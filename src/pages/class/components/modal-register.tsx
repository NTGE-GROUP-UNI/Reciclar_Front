import { X } from "lucide-react";
import { Button, Form } from "@/shared/components/shared";
import { Spinner } from "@/shared/ui/spinner";
import type { FormData } from "@/shared/components/form/type";
import { postStudent } from "@/entities/student/api/post-student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SetStateAction } from "react";

export interface ModalRegisterProps {
    openModalRegister: React.Dispatch<SetStateAction<boolean>>,
    id: string,
    shift: string
}

export const ModalRegister = ({
    openModalRegister,
    id,
    shift
}: ModalRegisterProps) => {

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: postStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] })
            openModalRegister(false);
        }
    })

    const handleSubmit = (data: FormData) => {

        const condition = data.className && data.shift && data.expirationYear && data.name;

        if (condition) {
            const { name, shift, className, expirationYear } = data;
            mutation.mutate({
                student: {
                    className,
                    fullName: name?.trim(),
                    shift,
                    expirationYear
                }
            })
        }
    }

    return (
        <section
            className="
                w-full h-full bg-zinc-950/50
                fixed top-0 right-0 flex items-center
                justify-center z-50 flex-col p-8
            "
        >
            <div
                className="
                    w-full bg-zinc-50 max-w-md
                    rounded-lg shadow-sm flex flex-col items-center 
                    border border-zinc-200
                "
            >
                <div
                    className="
                        w-full flex justify-center
                        items-center border-b border-zinc-200
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
                            Cadastre um novo aluno!
                        </h1>
                        <button
                            onClick={() => openModalRegister(prev => !prev)}
                            className="
                                bg-transparent hover:bg-zinc-200
                                transition-colors duration-150 p-1 rounded-lg
                            "
                        >
                            <X
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
                                Nome completo
                            </Form.Label>
                            <Form.Input
                                id="name"
                                zodName="name"
                                name="name"
                                placeholder="Digite o nome do aluno"
                                type="text"
                            />
                        </Form.Wrapper>
                        <Form.Wrapper>
                            <Form.Label
                                htmlFor="className"
                            >
                                Turma
                            </Form.Label>
                            <Form.Select.Root
                                zodName="className"
                                defaultValue=""
                                id="className"
                            >

                                <Form.Select.Option
                                    value={id}
                                    id={id}
                                >
                                    {id}
                                </Form.Select.Option>
                            </Form.Select.Root>
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
                                    value={shift}
                                    id={shift.toLowerCase()}
                                >
                                    {shift}
                                </Form.Select.Option>
                            </Form.Select.Root>
                        </Form.Wrapper>
                        <Form.Wrapper>
                            <Form.Label
                                htmlFor="expirationYear"
                            >
                                Ano de expiração
                            </Form.Label>
                            <Form.Select.Root
                                zodName="expirationYear"
                                defaultValue=""
                                id="expirationYear"
                            >
                                <Form.Select.Option
                                    value="2026"
                                    id="2026"
                                >
                                    2026
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2027"
                                    id="2027"
                                >
                                    2027
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2028"
                                    id="2028"
                                >
                                    2028
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2029"
                                    id="2029"
                                >
                                    2029
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2030"
                                    id="2030"
                                >
                                    2030
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2031"
                                    id="2031"
                                >
                                    2031
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="2032"
                                    id="2032"
                                >
                                    2032
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
            </div>
        </section>
    )
}