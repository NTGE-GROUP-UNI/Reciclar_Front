//INTERFACE
import type { LabelProps } from "./interface"

export const Label = ({ ...props }: LabelProps) => {

    return (
        <label
            className={`
                 transition-all duration-300 font-medium text-sm
                 text-zinc-900 dark:text-zinc-200 cursor-pointer
            `}
            {...props}
        >

        </label>
    )
}