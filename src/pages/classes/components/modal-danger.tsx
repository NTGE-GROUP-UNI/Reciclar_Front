import { Form } from "@/shared/components/shared";
import { X, MegaphoneOff } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";
import { useTheme } from "@/shared/hooks/theme/useTheme";
import type { SetStateAction } from "react";
import type { FormData } from "@/shared/components/form/type";
import { useCurrentClassroom } from "@/shared/store/classroom/classroom.store";
import { deleteClassroom } from "@/entities/classroom/api/delete-classrooms";

interface ModalDangerProps {
    setOpenModalDanger: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalDanger = ({ setOpenModalDanger }: ModalDangerProps) => {

    const { classroom } = useCurrentClassroom();
    const { themeValue } = useTheme();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteClassroom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            setOpenModalDanger(false);
        }
    })
    const handleSubmit = (data: FormData) => {

        const formName = data.className?.toLowerCase().trim();
        const studentName = classroom?.className?.toLowerCase().trim()

        if (formName === studentName){
            mutation.mutate({
                data: {
                    id: classroom?.classId,
                },
            });
        }

    }

    return (
        <section className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col">
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
                        Vocẽ tem certeza que da ação que está tomando? Ao clicar no botão <strong>"Sim, tenho certeza"</strong> você irá excluir essa turma <strong>({classroom?.className})</strong> em <strong>inativo</strong>.
                    </p>
                    <div className="w-full flex flex-col">

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