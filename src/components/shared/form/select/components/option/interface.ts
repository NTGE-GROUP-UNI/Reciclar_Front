//REACT
import type { OptionHTMLAttributes, ReactNode } from "react";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement>{
    children: ReactNode;
}