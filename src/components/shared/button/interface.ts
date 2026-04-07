//REACT
import type { ButtonHTMLAttributes, ReactNode } from "react";

//TYPE
import type { ButtonType } from "./type";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    typeButton: ButtonType;
}