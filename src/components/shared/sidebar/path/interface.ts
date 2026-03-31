import type { ReactNode } from "react";
import type { LinkProps } from "react-router-dom";

export interface PathProps extends LinkProps {
    children: ReactNode;
}