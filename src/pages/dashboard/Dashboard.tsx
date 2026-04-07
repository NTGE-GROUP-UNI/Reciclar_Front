//COMPONENTS
import { TitleStructure } from "../../components/shared/titleStructure/TitleStructure";
import { Card } from "./components/card/Card";
import { Form } from "../../components/shared/form/Form";
import { Button } from "../../components/shared/button/Button";

//LUCIDE REACT
import { FileText } from "lucide-react";

//CONSTANTS
import { students } from "./constants/students";

export const Dashboard = () => {

    return (
        <div
            className="
                w-full flex flex-col justify-start items-center h-full
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
                    <p
                        className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                        "
                    >
                        Gerenciamento de alunos e frequência
                    </p>
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
                    submit={() => console.log("Hello World")}
                >
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="filter"
                        >
                            Buscar aluno
                        </Form.Label>
                        <Form.Input
                            id="filter"
                            zodName="filter"
                            placeholder="Digite o nome do aluno..."
                        />
                    </Form.Wrapper>
                    <Button
                        typeButton="default"
                    >
                        Buscar
                    </Button>
                </Form.Root>

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
            </div>
        </div>
    )
}