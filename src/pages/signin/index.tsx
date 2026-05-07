import {
    Form,
    Button
} from "@/shared/components/shared";
import { useTheme } from "@/shared/hooks/theme/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import type { FormData } from "@/shared/components/form/type";
import { useMutation } from "@tanstack/react-query";
import { postAuthSignin } from "@/entities/auth/api/post-auth-signin";
import { useAuthStore } from "@/shared/store/auth/auth.store";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {

    const { setToken } = useAuthStore((s) => s);
    const { toggleTheme } = useTheme((state) => state);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: postAuthSignin,
        onSuccess: (data) => {
            setToken(data.accessToken);
            navigate("/", { replace: true })
        }
    })

    const handleSubmit = (data: FormData) => {
        const condition = data.email && data.password;

        if (condition) {
            const { email, password} = data;
            mutation.mutate({
               data: {
                    email,
                    password
               }
            });
        }
    }

    return (
        <main
            className={`
                w-full flex flex-col justify-center
                items-center py-12 min-h-dvh
                bg-cover font-inter px-8 
                bg-zinc-50 dark:bg-zinc-900
                relative overflow-hidden
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
                    bg-[--primary-blue-color] dark:bg-[--primary-blue-color-dark] 
                `}
            ></div>

            <div
                className="
                    bg-zinc-100 dark:bg-zinc-900
                    w-full max-w-md z-50
                    rounded-md shadow-sm border
                    border-zinc-200 dark:border-zinc-800 px-8 py-6
                     
                "
            >
                <Form.Root
                    dir="col"
                    submit={handleSubmit}
                >

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
                    </Form.Wrapper>
                    <Button
                        typeButton="sign-in"
                    >
                        Entrar
                    </Button>
                </Form.Root>
            </div>

            <button
                onClick={toggleTheme}
                type="button"
                className={`
                    absolute left-8 bottom-8  p-3 rounded-md
                    hidden md:block 
                    hover:bg-slate-200 dark:hover:bg-slate-800
                `}
            >
                <FontAwesomeIcon
                    className={`
                         
                        text-zinc-900 -rotate-180
                        dark:text-zinc-50 dark:rotate-180
                    `}
                    icon={faCircleHalfStroke} />
            </button>
        </main>
    )
}