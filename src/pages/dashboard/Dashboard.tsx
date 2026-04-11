/*=========== SHARED COMPONENTS ===========*/
import { 
    TitleStructure,
    Form,
    Button,
    Loader,
    Description
} from "@/components/shared/shared";

/*=========== COMPONENTS ===========*/
import { Card } from "./components/card/Card";

/*=========== LUCIDE REACT (LIB) ===========*/
import { FileText, RefreshCcw, SlidersHorizontal } from "lucide-react";

/*=========== REACT ===========*/
import { useEffect, useState, useTransition } from "react";

/*=========== TYPE ===========*/
import type { FormData } from "../../components/shared/form/type";

/*=========== SERVICE ===========*/
import { getStudents } from "@/service/students/students";

/*=========== INTERFACES ===========*/
import type { IStudent } from "@/service/students/interfaces";

export const Dashboard = () => {

    const [isFiltred, setIsFiltered] = useState(false);
    const [students, setStudents] = useState<IStudent[]>([]);
    const [cacheStudents, setCacheStudents] = useState<IStudent[]>([]);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchStudents = async () => {
            const data = await getStudents();
            setStudents(data);
            setCacheStudents(data);
        };
        startTransition(() => fetchStudents());
    },[]);
    
    const handleSubmit = (data: FormData) => {

        const { filterName, filterClass } = data;  
        

        const condition = filterName || filterClass;

        if(condition){
            const filtered = cacheStudents?.filter((student) => {
                const matchName = filterName
                    ? student.fullName.toLowerCase().includes(filterName.toLowerCase())
                    : true;

                //const matchShift = filterShift
                //? student.shiftClass === filterShift
                //: true;

                const matchClass = filterClass
                    ? student.className.charAt(6) === filterClass
                    : true;

                return matchName && matchClass;
            });

            setStudents(filtered);
            setIsFiltered(true);
        }
    }

    const reloadDatas = () => {
        setStudents(cacheStudents);
        setIsFiltered(false);
    };

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
                        Dashboard
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

                <button
                    className="
                        bg-green-500 dark:bg-green-700
                        text-zinc-50 dark:text-zinc-200
                        w-full max-w-48 px-2 py-3 rounded-xl
                        flex items-center justify-center gap-2
                    "
                >
                    <FileText /> <span>Exportar Excel</span>
                </button>
            </TitleStructure>

            <div
                className="
                    w-full flex flex-col
                "
            >
                <Form.Root
                    dir="row"
                    submit={handleSubmit}
                >
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="filterName"
                        >
                            Buscar aluno
                        </Form.Label>
                        <Form.Input
                            id="filterName"
                            zodName="filterName"
                            placeholder="Digite o nome do aluno..."
                        />
                    </Form.Wrapper>
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
                                <Form.Select.Option
                                    value="A"
                                    id="classA"
                                >
                                    Turma A
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="B"
                                    id="classB"
                                >
                                    Turma B
                                </Form.Select.Option>
                                <Form.Select.Option
                                    value="C"
                                    id="classC"
                                >
                                    Turma C
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
                    isPending 
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
                    students && students.length >= 1 ?
                        <div
                            className="
                    py-8 flex flex-row flex-wrap gap-6
                "
                        >

                            {
                                students.map((student, index) => (
                                    <Card
                                        student={student}
                                        key={index}
                                    />
                                ))
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
                                Ops! Aluno não foi encontrado...
                            </h1>
                            <img
                                src="public/not_found_filter.svg"
                                alt="Imagem ilustrativa"
                                className="
                                w-full max-w-md 
                            "
                            />
                        </div>
                }
            </div>
        </div>
    )
}