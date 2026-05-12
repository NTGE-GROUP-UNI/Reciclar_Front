import type { OptionHTMLAttributes, ReactNode } from "react";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
    children: ReactNode;
}

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