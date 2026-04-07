//REACT HOOK FORM
import { useFormContext } from "react-hook-form"

//INTERFACE
import type { InputProps } from "./interface";


export const Input = ({ zodName, ...props }: InputProps) => {

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
            <input
                {...props}
                {...register(zodName)}
                className={`
                w-full border-2 rounded-md py-2 p-3
                2xl:text-md text-sm
                outline-none transition-all duration-300
                bg-zinc-100 text-zinc-900
                dark:bg-zinc-800 dark:text-zinc-200
                ${errors[zodName]?.message
                        ? "border-red-300 focus:border-red-400 focus:shadow-[0px_0px_0px_3px_#fca5a5] dark:border-red-800 dark:focus:shadow-[0px_0px_0px_3px_#450a0a]"
                        : "border-zinc-200 focus:border-zinc-300 focus:shadow-[0px_0px_0px_3px_#e4e4e7] dark:border-zinc-700 dark:focus:shadow-[0px_0px_0px_3px_#52525b]"
                    }
            `}
            />
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