//INTERFACE
import type { SelectProps } from "./interface"

//REACT HOOK FORM
import { useFormContext } from "react-hook-form"

export const Root = ({ children, zodName,...props }: SelectProps) => {

    const {
        register,
        formState: { errors }
    } = useFormContext();

    return (
        <div
            className="
                relative w-full
            "
        >
            <select
                {...register(zodName)}
                {...props}
                className={`
                    w-full py-2 px-4 rounded-lg dark:bg-zinc-800
                    dark:border-zinc-700
                    outline-none text-zinc-900 dark:text-zinc-200
                    cursor-pointer appearance-none border-2
                    2xl:text-md text-sm 
                    ${errors[zodName]?.message
                        ? "border-red-300 focus:border-red-400 focus:shadow-[0px_0px_0px_3px_#fca5a5] dark:border-red-800 dark:focus:shadow-[0px_0px_0px_3px_#450a0a]"
                        : "border-zinc-200 focus:border-zinc-300 focus:shadow-[0px_0px_0px_3px_#e4e4e7] dark:border-zinc-700 dark:focus:shadow-[0px_0px_0px_3px_#52525b]"
                    }
                `}
            >
                {children}
            </select>
            <span
                className="
                absolute w-full left-0 
                2xl:-bottom-5 2xl:text-xs
                bottom-0 text-[.65rem] 
                text-red-500 font-medium
            "
            >
                {errors[zodName]?.message && String(errors[zodName]?.message)}
            </span>
        </div>
    )
}