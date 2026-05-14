import { Form } from "@/shared/components/shared";
import { X, MegaphoneOff } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";
import type { SetStateAction } from "react";
import type { FormData } from "@/shared/components/form/type";
import { useCurrentFoul } from "@/shared/store/foul/foul.store";
import { patchStudentJustifyAbsence } from "@/entities/student/api/patch-student-justify-absence";
import { handleToasts } from "@/shared/lib/toast/toast-custom";

interface ModalDangerProps {
    setOpenModalDanger: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalDanger = ({ setOpenModalDanger }: ModalDangerProps) => {

    const { foul } = useCurrentFoul();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: patchStudentJustifyAbsence,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["fouls"],
                    exact: false
                }),
                queryClient.invalidateQueries({
                    queryKey: ["fouls_metrics"]
                })
            ])
        }
    })

    const handleSubmit = (data: FormData) => {
        if (foul) {
            const foulStudentName = foul.name?.toLowerCase().trim();
            const foulClassName = foul.className?.toLowerCase().trim();
            const name = data.name?.toLowerCase().trim();
            const className = data.className?.toLowerCase().trim();

            console.log(foulStudentName, foulClassName, name, className);

            if (name === foulStudentName && className === foulClassName) {
                if(foul.id){
                    mutation.mutate(foul.id);
                    return;
                }       
            }

            if (name !== foulStudentName || className !== foulClassName) {
                handleToasts({
                    message: "Operação inválida",
                    type: "error"
                })
                return;
            }
        }
    }

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
                        Vocẽ tem certeza que da ação que está tomando? Ao clicar no botão <strong>"Sim, tenho certeza"</strong> você irá abonar a falta do aluno <strong>{foul?.name}</strong> da turma/classe <strong>({foul?.className})</strong> do dia <strong>{foul?.date}</strong>.
                    </p>
                    <div className="w-full flex flex-col">
                        <Form.Root
                            dir="col"
                            submit={handleSubmit}
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
                            <Form.Wrapper>
                                <Form.Label
                                    htmlFor="className"
                                >
                                    Nome da turma
                                </Form.Label>
                                <Form.Input
                                    id="className"
                                    zodName="className"
                                    placeholder="Digite o nome da turma para concluir a ação"
                                />
                            </Form.Wrapper>
                            <div className="flex flex-col gap-3">
                                <motion.button type="button" whileTap={{ scale: 0.95 }} transition={{ duration: 0.1, ease: "easeIn" }}
                                    onClick={() => setOpenModalDanger(false)}
                                    className="bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-50 w-full px-2 py-3 rounded-xl flex items-center justify-center gap-2">
                                    <X /> Não
                                </motion.button>
                                <motion.button type="submit" whileTap={{ scale: 0.95 }} transition={{ duration: 0.1, ease: "easeIn" }}
                                    className="bg-red-400 dark:bg-red-900 border border-red-600 dark:border-red-400 text-red-900 dark:text-red-400 w-full px-2 py-3 rounded-xl flex items-center justify-center gap-2">
                                    {
                                        mutation.isPending
                                        ?
                                        <Spinner
                                            height={28}
                                            width={28}
                                        />
                                        :
                                        <>
                                            <MegaphoneOff /> Sim, tenho certeza
                                        </>
                                    }
                                </motion.button>
                            </div>
                        </Form.Root>
                    </div>
                </div>
            </div>
        </section>
    );
}