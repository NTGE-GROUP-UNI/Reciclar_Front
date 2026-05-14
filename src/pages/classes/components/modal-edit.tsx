import { type SetStateAction } from "react";
import { X } from "lucide-react";
import { Button, Form } from "@/shared/components/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormData } from "@/shared/components/form/type";
import { useCurrentClassroom } from "@/shared/store/classroom/classroom.store";
import { putClassrooms } from "@/entities/classroom/api/put-classrooms";
import { Spinner } from "@/shared/ui/spinner";
import { maskClassName } from "@/shared/utils/classroom/utils";

interface ModalEditProps {
    setOpenModalEdit: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalEdit = ({ setOpenModalEdit }: ModalEditProps) => {

    const { classroom } = useCurrentClassroom();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: putClassrooms,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] })
            setOpenModalEdit(false);
        }
    });

    const shifts = ["Manhã", "Tarde", "Noite"];

    const availableShifts = shifts.filter(
        (shift) => shift !== classroom?.shift
    );

    const handleSubmit = (data: FormData) => {

        if(classroom) {
            mutation.mutate({
                data: {
                    id: classroom.classId,
                    shift: data?.shift,
                    name: `Turma ${data?.className}`,
                },
            });
            return;
        }
    }

    return (
        <section className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col p-8">
            <div className="w-full bg-zinc-50 max-w-md rounded-lg shadow-sm flex flex-col items-center border border-zinc-200">
                <div className="w-full flex justify-center items-center border-b border-zinc-200">
                    <div className="w-full flex justify-between p-8 items-center">
                        <h1 className="font-medium text-zinc-950 text-xl dark:text-zinc-50">
                            Editar Classe! <strong>({classroom?.className})</strong>
                        </h1>

                        <button
                            className="bg-transparent hover:bg-zinc-200 transition-colors duration-150 p-1 rounded-lg"
                            onClick={() => setOpenModalEdit(prev => !prev)}
                        >
                            <X height={20} width={20} />
                        </button>
                    </div>
                </div>

                <div className="w-full px-8 py-4">
                    <Form.Root
                        dir="col"
                        submit={handleSubmit}
                    >
                        <Form.Wrapper>
                            <Form.Label
                                htmlFor="className"
                            >
                                Nome da turma
                            </Form.Label>
                            <Form.Input
                                onChange={maskClassName}
                                id="className"
                                zodName="className"
                                name="className"
                                type="text"
                                placeholder={classroom?.className}
                            />
                        </Form.Wrapper>

                        <Form.Wrapper>
                            <Form.Label htmlFor="shift">
                                Turno
                            </Form.Label>

                            <Form.Select.Root
                                zodName="shift"
                                defaultValue=""
                                id="shift"
                            >
                                <Form.Select.Option
                                    id={classroom?.shift}
                                    value={classroom?.shift}
                                >
                                    {classroom?.shift}
                                </Form.Select.Option>

                                {availableShifts.map((shift) => (
                                    <Form.Select.Option
                                        key={shift}
                                        value={shift}
                                        id={shift}
                                    >
                                        {shift}
                                    </Form.Select.Option>
                                ))}
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
                                    "Atualizar"
                            }
                        </Button>
                    </Form.Root>
                </div>

            </div>
        </section>
    );
}