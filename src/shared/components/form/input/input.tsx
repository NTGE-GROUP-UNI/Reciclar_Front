import { useFormContext } from "react-hook-form"
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    zodName: string;
}

export const Input = ({ zodName, onChange,...props }: InputProps) => {

    const {
        register,
        formState: { errors }
    } = useFormContext();

    const { onChange: rhfOnChange, ...rest } = register(zodName);

    return (
        <div
            className="
                relative w-full
            "   
        >
            <input
                {...props}
                {...rest}
                onChange={(e) => {
                    onChange?.(e);
                    e.target.value = e.target.value;
                    rhfOnChange(e);
                }}
                className={`
                w-full border rounded-md py-2 p-3
                2xl:text-md text-sm
                outline-none
                bg-zinc-200 text-zinc-900 border-zinc-400 placeholder-zinc-600
                dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700
                disabled:cursor-not-allowed disabled:opacity-40
                ${errors[zodName]?.message
                    ? "focus:border-red-400 focus:shadow-[0px_0px_0px_3px_#fca5a5] dark:border-red-800 dark:focus:shadow-[0px_0px_0px_3px_#450a0a]"
                    : "focus:border-zinc-400 focus:shadow-[0px_0px_0px_3px_#D9D9D9] dark:border-zinc-700 dark:focus:shadow-[0px_0px_0px_3px_#52525b]"
                }
            `}
            />
            <span
                className="
                    absolute w-full left-0 
                    -bottom-5 2xl:text-xs
                    text-[.65rem] 
                    text-red-500 font-medium
                "
            >
                {errors[zodName]?.message && String(errors[zodName]?.message)}
            </span>
        </div>
    )
}