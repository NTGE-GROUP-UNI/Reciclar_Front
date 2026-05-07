//REACT
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ToggleButtonProps extends Partial<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">> {
    children?: ReactNode;
    isActive: boolean;
    style?: string;
}