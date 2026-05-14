import {
    MoonStar,
    SunMedium,
    Info,
    DoorOpen,
    Smile,
    PersonStanding,
    BriefcaseBusiness,
} from "lucide-react";
import { setTheme, themeStore } from "@/shared/store/theme/theme";
import { setAvatar } from "@/shared/store/avatar/avatar";
import { setDisplayName } from "@/shared/store/user/user";
import { motion } from "motion/react";
import Avatar from "boring-avatars";
import { useUser } from "@/shared/hooks/user/use-user";
import { Card } from "./components/card";
import {
    Button,
    Form,
    TitleStructure,
    ToggleButton
} from "@/shared/components/shared"
import { avatars } from "./constants/avatars";
import type { FormData } from "@/shared/components/form/type";
import { useAuthStore } from "@/shared/store/auth/auth.store";
import { useNavigate } from "react-router-dom";

export const Settings = () => {

    const { logout, setToken } = useAuthStore((s) => s);
    const themeValue = themeStore(state => state.themeValue)
    const { displayName } = useUser((state) => state);
    const navigate = useNavigate();

    const handleSubmit = (data: FormData) => {
        const value = String(data.displayName).trim();
        setDisplayName(value);
    }

    return (
        <div
            className="
                w-full flex flex-col gap-6 justify-start 
                p-8 items-center
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
                        Configurações
                    </h1>
                    <p
                        className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                            
                        "
                    >
                        Personalize as configurações do sistema
                    </p>
                </div>
            </TitleStructure>

            <div
                className="
                    w-full flex flex-col
                    gap-8 items-center
                "
            >
                <Card icon={themeValue ? MoonStar : SunMedium} title="Alterar tema" description="Alterne entre o tema claro e escuro">
                    <ToggleButton
                        onClick={() => setTheme()}
                        isActive={themeValue}
                    >
                        {themeValue ? <SunMedium height={17} /> : <MoonStar height={17} />}
                    </ToggleButton>
                </Card>

                <Card icon={PersonStanding} title="Nome de exibição" description="Altere o nome de exibição do sistema" column={true}>
                    <div
                        className="w-full md:max-w-96"
                    >
                        <Form.Root
                            dir="row"
                            submit={handleSubmit}
                        >
                            <Form.Wrapper>
                                <Form.Label
                                    htmlFor="displayName"
                                >
                                    Nome de exibição
                                </Form.Label>
                                <Form.Input
                                    id="displayName"
                                    zodName="displayName"
                                    placeholder={displayName}
                                />
                            </Form.Wrapper>
                            <Button
                                typeButton="blue"
                                type="submit"
                                className="md:max-w-40 md:h-10"
                            >
                                Salvar
                            </Button>
                        </Form.Root>
                    </div>
                </Card>

                <Card icon={BriefcaseBusiness} title="Tipo da conta" description="Tipo da conta atual">
                    <div
                        className={`
                        border bg-zinc-200 border-zinc-300 text-zinc-600 
                        dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500"
                        rounded-md py-1 px-3 grid place-items-center
                    `}
                    >
                        <span className="m-0 p-0">
                            admin
                        </span>
                    </div>
                </Card>

                <Card className="md:block hidden" icon={Smile} title="Avatar" description="Escolha qual avatar utilizar na aplicação" column={true}>
                    <div
                        className="
                        flex flex-row justify-center items-center gap-2
                    "
                    >
                        {
                            avatars.map((avatar, index) => {

                                const { height, width, colors, name } = avatar;

                                return (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.1 }}
                                        onClick={() => setAvatar({ colors, name })}
                                    >
                                        <Avatar
                                            height={height}
                                            width={width}
                                            name={name}
                                            colors={colors}
                                            variant="marble"
                                        />
                                    </motion.button>
                                )
                            })
                        }
                    </div>
                </Card>

                <Card icon={Info} title="Sobre o sistema" description="Sistema de Gestão de Alunos - Instituto Reciclar | Versão 1.0.0 | © 2026 Instituto Reciclar" />

                <Card icon={DoorOpen} title="Sair do sistema" description="Finalize sua sessão atual e retorne à tela de login" column={true}>
                    <Button
                        typeButton="red"
                        type="button"
                        className="md:max-w-40"
                        onClick={() => {
                            logout();
                            setToken(null);
                            navigate("/sign-in");
                        }}
                    >
                        Sair
                    </Button>
                </Card>
            </div>
        </div>
    )
}