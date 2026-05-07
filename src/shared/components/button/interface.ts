//REACT
import type { ReactNode } from "react";

//TYPE
import type { ButtonType } from "./type";

//MOTION
import type { HTMLMotionProps } from "motion/react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    typeButton: ButtonType;
}