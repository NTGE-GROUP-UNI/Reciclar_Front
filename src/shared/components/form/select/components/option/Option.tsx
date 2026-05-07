//INTERFACE
import type { OptionProps } from "./interface"

export const Option = ({ children, ...props }: OptionProps) => {
    return (
        <option 
            className="
                appearance-none
            " 
            {...props}
        >
            { children }
        </option>
    )
}