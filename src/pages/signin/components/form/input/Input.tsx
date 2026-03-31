//REACT HOOK FORM
import { useFormContext } from "react-hook-form"

//INTERFACE
import type { InputProps } from "./interface";


export const Input = ({ zodName, ...props }: InputProps) => {

    const {
        register
    } = useFormContext();

    return <input
                className="
                    border-zinc-200 bg-zinc-50 text-zinc-900
                    dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200
                    w-full px-3 py-2 rounded-md outline-none
                    border transition-all duration-300
                "
                {...register(zodName)} {...props} 
            />
}