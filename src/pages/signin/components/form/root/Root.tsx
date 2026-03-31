//REACT HOOK FORM
import { FormProvider, useForm } from "react-hook-form"

//TYPES
import type { FormData } from "../types";
import type { RootProps } from "./interface";

//Zod Resolver
import { zodResolver } from "@hookform/resolvers/zod";

//SCHEMA
import { UserSchema } from "../schema";

//FRAME MOTION
import { motion } from "motion/react"

export const Root = ({ 
    children
}: RootProps) => {

    const methods = useForm<FormData>({
        resolver: zodResolver(UserSchema)
    });

    const onSubmit = () => {
        console.log("Test");
    }

    return (
        <FormProvider {...methods}>
            <form 
                className="
                    w-full max-w-lg p-8  shadow-md
                    rounded-lg flex flex-col gap-6 items-center
                    border ${formStyles} transition-all duration-300 z-10
                    bg-white border-zinc-300
                    dark:bg-zinc-800 dark:border-zinc-700
                "
                onSubmit={methods.handleSubmit(onSubmit)}
            >

                {children}

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="
                        w-full  rounded-md
                        px-6 py-3 text-zinc-50 font-bold shadow-sm
                        ${buttonStyles} transition-all duration-75
                        hover:bg-blue-800 bg-[--primary-blue-color]
                        dark:hover:bg-blue-900 dark:bg-blue-800
                        mt-10
                    "
                    type="submit"
                >
                    Entrar
                </motion.button>
            </form>
        </FormProvider>
    )
}