import type { ReactNode } from "react";

export interface TitleStructureProps {
    children: ReactNode;
}

export const TitleStructure = ({ children }: TitleStructureProps) => {
    return (
        <div
            className="
                w-full flex flex-col md:flex-row md:justify-between
                py-4 md:items-center gap-4 md:gap-0
            "
        >
            { children }
        </div>
    )
}