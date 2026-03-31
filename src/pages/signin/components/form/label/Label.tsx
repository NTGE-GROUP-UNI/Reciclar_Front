//INTERFACE
import type { LabelProps } from "./interface"

export const Label = ({ ...props }: LabelProps) => {

    return (
        <label 
            className={`
                 transition-all duration-300 font-medium text-md
                 text-zinc-900 dark:text-zinc-200
            `}
            {...props}
        >

        </label>
    )
}