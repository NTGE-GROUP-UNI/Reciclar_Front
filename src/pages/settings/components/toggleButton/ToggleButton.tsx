//INTERFACE
import type { ToggleButtonProps } from "./interface"

export const ToggleButton = ({ children, isActive, ...props }: ToggleButtonProps) => {

    return (
        <button
            { ...props }
            className={`
                bg-zinc-200 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800
                border w-full max-w-16 h-9 rounded-lg
                relative transition-all duration-300
            `}
        >
            <div
                className={`
                    h-7 w-7 rounded-lg absolute
                    top-[50%] translate-y-[-50%] transition-all
                    bg-zinc-100 text-zinc-900
                    dark:bg-zinc-800 dark:text-zinc-100
                    duration-200 ${isActive ? "translate-x-[6px]" : "translate-x-[28px]"}
                    flex justify-center items-center text-xs
                `}
            >
                { children }
            </div>
        </button>
    )

}