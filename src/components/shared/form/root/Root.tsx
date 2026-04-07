//INTERFACE
import type { RootProps } from "./interface"

//REACT HOOK FORM
import { FormProvider, useForm } from "react-hook-form"

//TYPE
import type { FormData } from "../type";

//ZOD
import { zodResolver } from "@hookform/resolvers/zod";

//SCHEMA
import { FormSchema } from "../schema";

export const Root = ({ children, submit, dir, ...props }: RootProps) => {

    const methods = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        mode: "all",
    });

    const { handleSubmit } = methods;

    return (
        <FormProvider
            { ...methods }
        >
            <form
                onSubmit={handleSubmit(submit, (errors) => {
                    console.log(errors);
                })}
                {...props}
                className={`
                    flex w-full gap-3 
                    py-5 relative ${ dir === "row" ? "flex-row items-end" : "flex-col justify-center" }
                    gap-8
                `}
            >
                {children}
            </form>
        </FormProvider>
    )
}