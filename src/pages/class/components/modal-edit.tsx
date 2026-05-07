import { type SetStateAction } from "react";
import { X } from "lucide-react";
import { useCurrentStudent } from "@/shared/store/student/student.store";
import { Button, Form } from "@/shared/components/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormData } from "@/shared/components/form/type";
import { putStudent } from "@/entities/student/api/put-student";
import { getClassrooms } from "@/entities/classroom/api/get-classrooms";
import { useTheme } from "@/shared/hooks/theme/useTheme";
import { Spinner } from "@/shared/ui/spinner";
import { handleToasts } from "@/shared/lib/toast/toastTypes";

interface ModalEditProps {
    setOpenModalEdit: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalEdit = ({ setOpenModalEdit }: ModalEditProps) => {

    const { student } = useCurrentStudent();

    const { themeValue } = useTheme();

    const { data: classes } = useQuery({
        queryKey: ["classes"],
        queryFn: getClassrooms,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: putStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        }
    });

    const shifts = ["Manhã", "Tarde", "Noite"];

    const availableShifts = shifts.filter(
        (shift) => shift !== student?.shift
    );

    const availableClasses = classes?.filter(
        (cl) => cl.className.slice(6).toLowerCase() !== student?.className.slice(6).toLowerCase()
    );

    const uniqueClasses = [...new Set(availableClasses?.map((cl) => cl.className.slice(6)) || [])];

    const handleSubmit = (data: FormData) => {

        if(student) {
            const existClass = classes?.find((cl) => {
                if (cl.className.slice(6).toLowerCase() === data?.className?.toLowerCase() && cl.shift.toLowerCase() === data?.shift?.toLowerCase()){
                    return cl;
                }
            })

            if(existClass){
                mutation.mutate({
                    student: {
                        fullName: data?.name,
                        id: student.id,
                        shift: data?.shift,
                        className: data?.className,
                        expirationYear: data?.expirationYear
                    },
                    theme: themeValue
                });

                setOpenModalEdit(false);
                return;
            }

            handleToasts({
                message: "Classe/turno inexistente",
                theme: themeValue,
                type: "error"
            })
            return;
            
        }
    }

    return (
        <section className="w-full h-full bg-zinc-950/50 fixed top-0 right-0 flex items-center justify-center z-50 flex-col">
            <div className="w-full bg-zinc-50 max-w-md rounded-lg shadow-sm flex flex-col items-center border border-zinc-200">
                <div className="w-full flex justify-center items-center border-b border-zinc-200">
                    <div className="w-full flex justify-between p-8 items-center">
                        <h1 className="font-medium text-zinc-950 text-xl dark:text-zinc-50">
                            Editar aluno! <strong>({student?.fullName})</strong>
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
                                htmlFor="name"
                            >
                                Nome completo
                            </Form.Label>
                            <Form.Input
                                id="name"
                                zodName="name"
                                name="name"
                                type="text"
                                defaultValue={student?.fullName}
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
                                    id={student?.className.charAt(student.className.length - 1)}
                                    value={student?.className.charAt(student.className.length - 1)}
                                >
                                    {student?.className.charAt(student.className.length - 1)}
                                </Form.Select.Option>

                                {
                                    uniqueClasses && 
                                    uniqueClasses?.map((cl, index) => {
                                        return (
                                            <Form.Select.Option
                                                key={index}
                                                value={cl}
                                                id={cl}
                                            >
                                                {cl}
                                            </Form.Select.Option>
                                        )
                                    })
                                }

                                
                            </Form.Select.Root>
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
                                    id={student?.shift}
                                    value={student?.shift}
                                >
                                    {student?.shift}
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
                            typeButton="sign-in"
                        >
                            {
                                mutation.isPending
                                ?
                                <Spinner
                                    height={28}
                                    width={28}
                                />
                                :
                                <>
                                    Atualizar dados
                                </>
                            }
                        </Button>
                    </Form.Root>
                </div>

            </div>
        </section>
    );
}