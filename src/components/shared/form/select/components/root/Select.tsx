//INTERFACE
import type { SelectProps } from "./interface"

//REACT HOOK FORM
import { useFormContext } from "react-hook-form"

export const Root = ({ children, zodName,...props }: SelectProps) => {

    const {
        register,
    } = useFormContext();

    return (
        <select 
            {...register(zodName)} 
            {...props}
            className="
                w-full max-w-40 py-2 px-4 rounded-lg border dark:bg-zinc-800
                border-zinc-200 dark:border-zinc-700
                outline-none text-zinc-900 dark:text-zinc-200
                appearance-none cursor-pointer
                2xl:text-md text-sm 
            "
        >
            { children }
        </select>
    )
}