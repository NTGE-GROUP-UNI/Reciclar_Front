import { Button, Form } from "@/shared/components/shared";
import { X, MegaphoneOff, ShieldCheck } from "lucide-react";
import { useCurrentStudent } from "@/shared/store/student/student.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchStudentStatus } from "@/entities/student/api/patch-student-status";
import { Spinner } from "@/shared/ui/spinner";
import { useTheme } from "@/shared/hooks/theme/useTheme";
import type { FormData } from "@/shared/components/form/type";
import type { SetStateAction } from "react";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

interface ModalDangerProps {
    setOpenModalDanger: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalDanger = ({ setOpenModalDanger }: ModalDangerProps) => {

    const { student } = useCurrentStudent();
    const { themeValue } = useTheme();

    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: patchStudentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            setOpenModalDanger(false);
        }
    });

    const handleInactive = (data: FormData) => {

        if(student){
            const formName = data.name?.toLowerCase().trim();
            const studentName = student?.fullName?.toLowerCase().trim();
            const currentStatus = student?.status.toLowerCase() === "ativo" || student?.status.toLowerCase() === "alerta" ? "inativo" : (student?.absences > 1 ? "alerta" : "ativo");

            if (formName === studentName) {
                mutation.mutate({
                    student: {
                        id: student?.id,
                        status: currentStatus
                    },
                    theme: themeValue
                });
                return;
            }

            if (formName !== studentName) {
                handleToasts({
                    message: "Nome incorreto",
                    theme: themeValue,
                    type: "error"
                })
                return;
            }
        }
    }

    const statusKey = student?.status?.toLowerCase() === "alerta" || student?.status?.toLowerCase() === "ativo" ? "ativo" : "inativo";

    return (
        <section className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col p-8">
            <div className="w-full bg-zinc-50 dark:bg-zinc-900 max-w-md rounded-lg shadow-sm flex flex-col items-center border border-zinc-200 dark:border-zinc-800">
                <div className="w-full flex justify-center items-center border-b border-zinc-200 dark:border-zinc-800">
                    <div className="w-full flex justify-between p-8 items-center">
                        <h1 className="font-medium text-zinc-950 text-xl dark:text-zinc-50">
                            Atenção!
                        </h1>
                    </div>
                </div>
                <div className="w-full p-8">
                    <p className="font-medium text-zinc-800 text-lg dark:text-zinc-50 mb-8">
                        Vocẽ tem certeza que da ação que está tomando? Ao clicar no botão <strong>"Sim, tenho certeza"</strong> você irá transformar este usuário <strong>({student?.fullName})</strong> em {student?.status.toLowerCase() === "ativo" || student?.status.toLowerCase() === "alerta" ? <strong>inativo</strong> : <strong>ativo</strong>}.
                    </p>
                    <div className="w-full flex flex-col">

                        <Form.Root
                            dir="col"
                            submit={handleInactive}
                        >
                            <Form.Wrapper>
                                <Form.Label
                                    htmlFor="name"
                                >
                                    Nome do aluno
                                </Form.Label>
                                <Form.Input
                                    id="name"
                                    zodName="name"
                                    placeholder="Digite o nome do aluno para concluir a ação"
                                />
                            </Form.Wrapper>
                            <div className="flex flex-col gap-3">
                                <Button type="button" typeButton="gray" onClick={() => setOpenModalDanger(false)}>
                                    <X /> Não
                                </Button>
                                <Button type="submit" typeButton={`${statusKey === "inativo" ? "blue" : "red"}`}>
                                    {
                                        mutation.isPending
                                            ?
                                            <Spinner
                                                height={28}
                                                width={28}
                                            />
                                            :
                                            <>
                                                {student?.status.toLowerCase() === "ativo" || student?.status.toLowerCase() === "alerta" ? <MegaphoneOff /> : <ShieldCheck />} Sim, tenho certeza
                                            </>
                                    }
                                </Button>
                            </div>
                        </Form.Root>
                    </div>
                </div>
            </div>
        </section>
    );
}