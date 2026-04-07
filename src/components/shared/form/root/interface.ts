//REACT
import type { FormHTMLAttributes, ReactNode } from "react";

//TYPE
import type { dirType } from "./type";
import type { FormData } from "../type";

//REACT HOOK FORM
import type { SubmitHandler } from "react-hook-form";

export interface RootProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "dir"> {
    children: ReactNode;
    submit: SubmitHandler<FormData>;
    dir: dirType
}