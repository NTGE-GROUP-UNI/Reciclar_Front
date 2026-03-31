import type { ElementType, ReactNode } from "react";

export interface CardProps {
    children?: ReactNode;
    description: string;
    title: string;
    icon: ElementType
}