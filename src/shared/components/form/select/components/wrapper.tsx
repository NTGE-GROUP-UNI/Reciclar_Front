import type { ReactNode } from "react";

export interface WrapperProps {
    children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div
            className="
                relative w-full sm:max-w-40
            "
        >
            { children }
        </div>
    )
}