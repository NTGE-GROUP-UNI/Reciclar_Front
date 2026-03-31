//HOOKS
import { useUser } from "../../../../hooks/user/useUser"
import { useTheme } from "../../../../hooks/theme/useTheme";
import { useLanguage } from "../../../../hooks/language/useLanguage";

//STORE
import { setDisplayName } from "../../../../store/user/user";

//REACT-HOOK-FORM
import { useForm } from "react-hook-form";

//ZOD
import { zodResolver } from "@hookform/resolvers/zod";

//SCHEMA
import { DisplayNameSchema } from "./schema";

//TYPES
import type { FormType } from "./types";

//I18N
import { useTranslation } from "react-i18next";
import { handleToasts } from "../../../../lib/toast/toastTypes";

//COMPONENTS
import { Button } from "../button/Button";

export const Form = () => {

    const { displayName } = useUser((state) => state);
    const { themeValue } = useTheme((state) => state);
    const { language } = useLanguage((state) => state);
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormType>({
        resolver: zodResolver(DisplayNameSchema)
    })

    const onSubmit = (data: FormType) => {
        const name = data.displayName
                            .charAt(0).toUpperCase()
                            + data.displayName.slice(1).toLowerCase();

        if (displayName === name){
            handleToasts({ message: "Nenhuma alteração feita", theme: themeValue, type: "warn" });
            reset();
            return;
        }

        setDisplayName(t, name, themeValue);
        reset();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
                flex flex-row w-full 
                2xl:max-w-md 2xl:gap-6 
                max-w-xs gap-3
                py-5 relative
            "
        >
            <input
                type="text"
                placeholder={displayName}
                {...register("displayName")}
                className={`
                w-full border-2 rounded-md py-1 p-3
                2xl:text-md text-sm
                outline-none transition-all duration-300
                bg-zinc-100 text-zinc-900
                dark:bg-zinc-800 dark:text-zinc-200
                ${errors.displayName?.message 
                    ? "border-red-300 focus:border-red-400 focus:shadow-[0px_0px_0px_3px_#fca5a5] dark:border-red-800 dark:focus:shadow-[0px_0px_0px_3px_#450a0a]" 
                    : "border-zinc-200 focus:border-zinc-300 focus:shadow-[0px_0px_0px_3px_#e4e4e7] dark:border-zinc-700 dark:focus:shadow-[0px_0px_0px_3px_#52525b]"
                }
            `}
            />
            <span
                className="
                    absolute w-full left-0 
                    2xl:-bottom-1 2xl:text-xs
                    bottom-0 text-[.65rem] 
                    text-red-500 font-medium
                "
            >
                { errors.displayName?.message }
            </span>
            <Button
                type="default"
            >
                {language === "pt" ? "Salvar" : "Save"}
            </Button>
        </form>
    )
}