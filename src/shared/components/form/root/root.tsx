import type { FormHTMLAttributes, ReactNode } from "react";
import type { FormData } from "../type";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schema";

export interface RootProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "dir"> {
    children: ReactNode;
    submit: SubmitHandler<FormData>;
    dir: "row" | "col"
}

export const Root = ({ children, submit, dir, ...props }: RootProps) => {

    const methods = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        mode: "all",
    });

    const { handleSubmit, reset } = methods;

    return (
        <FormProvider
            { ...methods }
        >
            <form
                onSubmit={handleSubmit((data:any) => {
                    submit(data);
                    reset();
                })}
                {...props}
                className={`
                    flex w-full gap-3 
                    py-5 relative ${ dir === "row" ? "flex-col sm:flex-row items-end" : "flex-col justify-center" }
                    gap-8
                `}
            >
                {children}
            </form>
        </FormProvider>
    )
}