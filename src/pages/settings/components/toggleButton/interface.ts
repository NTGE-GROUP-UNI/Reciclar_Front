//REACT
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    isActive: boolean;
}