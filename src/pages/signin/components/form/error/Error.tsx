//REACT HOOK FORM
import { useFormContext } from "react-hook-form"
import type { FieldError } from "react-hook-form";

export const Error = ({ name }: { name: string }) => {

    const {
        formState: { errors }
    } = useFormContext();

    const error = errors[name] as FieldError | undefined;

    if(!error) return;

    return error && <p
                        className="
                            text-red-500 text-md leading-6 mt-1
                        "
                    >
                        {error?.message}
                    </p>
}