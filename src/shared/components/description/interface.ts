//REACT
import type { ReactNode } from "react";

type typeDirX = "right" | "left";
type typeDirY = "top" | "bottom"

export interface DescriptionProps {
    children: ReactNode;
    description: string;
    dirX: typeDirX;
    dirY: typeDirY;
    styles?: string;
}