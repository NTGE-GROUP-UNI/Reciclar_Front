//COMPONENTS
import { Form } from "./components/form/Form"

//HOOKS
import { useTheme } from "../../hooks/theme/useTheme"

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"

export const SignIn = () => {

    const { toggleTheme } = useTheme((state) => state);

    return (
        <main
            className={`
                w-full flex flex-col justify-center
                items-center py-12 min-h-dvh
                bg-cover font-inter px-8 transition-all
                bg-zinc-50 dark:bg-zinc-900
                duration-300 relative overflow-hidden
            `}
        >

            <div
                className={`
                    fixed 
                    h-[350vh] w-[60%] 
                    right-[-5%] top-[-80%] 
                    rotate-[45deg] 
                    opacity-80
                    z-0
                    bg-[--primary-blue-color] dark:bg-indigo-700
                `}
            ></div>
            <Form.Root>

                <div
                    className="
                        w-full grid place-items-center
                    "
                >
                    <h1
                        className="
                            font-medium text-3xl text-zinc-900
                            dark:text-zinc-200 leading-normal
                            mb-1
                        "
                    >
                        Bem-vindo!
                    </h1>
                    <p
                        className="
                            font-medium text-lg text-zinc-900
                            dark:text-zinc-200 leading-normal
                            mb-3
                        "
                    >
                        Entre agora com sua conta
                    </p>
                </div>

                <Form.Wrapper>
                    <Form.Label
                        htmlFor="email"
                    >
                        E-mail*
                    </Form.Label>
                    <Form.Input
                        id="email"
                        zodName="email"
                        name="email"
                        placeholder="Insira seu e-mail"
                        type="email"
                    />
                    <Form.Error
                        name="email"
                    />
                </Form.Wrapper>
                <Form.Wrapper>
                    <Form.Label
                        htmlFor="password"
                    >
                        Senha*
                    </Form.Label>
                    <Form.Input
                        id="password"
                        zodName="password"
                        name="password"
                        placeholder="Insira sua senha"
                        type="password"
                    />
                    <Form.Error
                        name="password"
                    />
                </Form.Wrapper>
                <Form.Wrapper>
                    <Form.Label
                        htmlFor="confirmPassword"
                    >
                        Confirme sua senha*
                    </Form.Label>
                    <Form.Input
                        id="confirmPassword"
                        zodName="confirmPassword"
                        name="confirmPassword"
                        placeholder="Repita sua senha"
                        type="password"
                    />
                    <Form.Error
                        name="confirmPassword"
                    />
                </Form.Wrapper>
            </Form.Root>

            <button
                onClick={toggleTheme}
                type="button"
                className={`
                    absolute left-8 bottom-8  p-3 rounded-md
                    transition-all duration-300
                    hover:bg-slate-200 dark:hover:bg-slate-800
                `}
            >
                <FontAwesomeIcon
                    className={`
                        transition-all duration-300
                        text-zinc-900 -rotate-180
                        dark:text-zinc-50 dark:rotate-180
                    `}
                icon={faCircleHalfStroke} />
            </button>
        </main>
    )
}