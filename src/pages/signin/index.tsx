import {
    Form,
    Button
} from "@/shared/components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import type { FormData } from "@/shared/components/form/type";
import { useMutation } from "@tanstack/react-query";
import { postAuthSignin } from "@/entities/auth/api/post-auth-signin";
import { useAuthStore } from "@/shared/store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/shared/ui/spinner";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { themeStore } from "@/shared/store/theme/theme";

export const SignIn = () => {

    const { t } = useTranslation();
    const { setToken } = useAuthStore((s) => s);
    const toggleTheme = themeStore.getState().toggleTheme;
    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

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

    const handleViewPassword = (e: any) => {

        const { name } = e.target.parentNode.dataset;

        if (name === "password") {
            setPasswordType((prev) => {
                if (prev === "password") return "text";
                return "password"
            })
            return;
        }

        if (name === "confirmPassword") {
            setConfirmPasswordType((prev) => {
                if (prev === "password") return "text";
                return "password"
            })
            return;
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

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.7,
                    ease: "easeOut"
                }}
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
                            {t("signIn.title")}
                        </h1>
                        <p
                            className="
                        font-medium text-lg text-zinc-900
                        dark:text-zinc-200 leading-normal
                        mb-3
                    "
                        >
                            {t("signIn.description")}
                        </p>
                    </div>

                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="email"
                        >
                            {t("signIn.labels.email")}*
                        </Form.Label>
                        <Form.Input
                            id="email"
                            zodName="email"
                            name="email"
                            placeholder={t("signIn.inputs.emailPlaceholder")}
                            type="email"
                        />
                    </Form.Wrapper>
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="password"
                        >
                            {t("signIn.labels.password")}*
                        </Form.Label>
                        <Form.Input
                            id="password"
                            zodName="password"
                            name="password"
                            placeholder={t("signIn.inputs.passwordPlaceholder")}
                            type={passwordType}
                        />
                        <motion.button
                            data-name="password"
                            onClick={(e) => handleViewPassword(e)}
                            className="absolute top-8 right-4 text-zinc-700"
                        >
                            {passwordType === "password" ? <Eye /> : <EyeClosed /> }
                        </motion.button>
                    </Form.Wrapper>
                    <Form.Wrapper>
                        <Form.Label
                            htmlFor="confirmPassword"
                        >
                            {t("signIn.labels.confirmPassword")}*
                        </Form.Label>
                        <Form.Input
                            id="confirmPassword"
                            zodName="confirmPassword"
                            name="confirmPassword"
                            placeholder={t("signIn.inputs.confirmPasswordPlaceholder")}
                            type={confirmPasswordType}
                        />
                        <motion.button
                            data-name="confirmPassword"
                            onClick={(e) => handleViewPassword(e)}
                            className="absolute top-8 right-4 text-zinc-700"
                        >
                            {confirmPasswordType === "password" ? <Eye /> : <EyeClosed />}
                        </motion.button>
                    </Form.Wrapper>
                    <Button
                        typeButton="blue"
                    >
                        {mutation.isPending ? <Spinner /> : t("signIn.buttons.enter")}
                    </Button>
                </Form.Root>
            </motion.div>

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