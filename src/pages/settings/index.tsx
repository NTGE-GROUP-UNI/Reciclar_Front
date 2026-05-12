import {
    MoonStar,
    SunMedium,
    Info,
    DoorOpen,
    Languages,
    Smile,
    PersonStanding,
    BriefcaseBusiness,
} from "lucide-react";
import { setTheme, themeStore } from "@/shared/store/theme/theme";
import { setLang } from "@/shared/store/language/language";
import { setAvatar } from "@/shared/store/avatar/avatar";
import { setDisplayName } from "@/shared/store/user/user";
import { motion } from "motion/react";
import Avatar from "boring-avatars";
import { useLanguage } from "@/shared/hooks/language/use-language";
import { useUser } from "@/shared/hooks/user/use-user";
import { useTranslation } from "react-i18next"
import { Card } from "./components/card";
import {
    Button,
    Form,
    TitleStructure,
    ToggleButton
} from "@/shared/components/shared"
import { avatars } from "./constants/avatars";
import type { FormData } from "@/shared/components/form/type";
import { useAuthStore } from "@/shared/store/auth/auth.store";
import { useNavigate } from "react-router-dom";

export const Settings = () => {

    const { logout, setToken } = useAuthStore((s) => s);
    const themeValue = themeStore(state => state.themeValue)
    const { language } = useLanguage((state) => state);
    const { displayName } = useUser((state) => state);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = (data: FormData) => {
        const value = String(data.displayName).trim();
        setDisplayName(t, value, themeValue);
    }

    return (
        <div
            className="
                w-full flex flex-col gap-6 justify-start 
                pb-12 px-8 pt-8 items-center
            "
        >

            <TitleStructure>
                <div>
                    <h1
                        className="
                            font-medium text-zinc-950 
                            text-2xl dark:text-zinc-50
                            mb-2 
                        "
                    >
                        {t("settings.title")}
                    </h1>
                    <p
                        className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                            
                        "
                    >
                        {t("settings.description")}
                    </p>
                </div>
            </TitleStructure>

            <div
                className="
                    w-full flex flex-col
                    gap-8 items-center
                "
            >
                <Card icon={themeValue ? MoonStar : SunMedium} title={t("settings.cards.theme.title")} description={t("settings.cards.theme.description")}>
                    <ToggleButton
                        onClick={() => setTheme(t, !themeValue)}
                        isActive={themeValue}
                    >
                        {themeValue ? <SunMedium height={17} /> : <MoonStar height={17} />}
                    </ToggleButton>
                </Card>

                <Card icon={Languages} title={t("settings.cards.language.title")} description={t("settings.cards.language.description")}>
                    <ToggleButton
                        onClick={() => setLang(t, themeValue)}
                        isActive={language === "pt"}
                    >
                        {language === "pt" ? "PT" : "EN"}
                    </ToggleButton>
                </Card>

                <Card icon={PersonStanding} title={t("settings.cards.displayName.title")} description={t("settings.cards.displayName.description")} column={true}>
                    <div
                        className="w-full md:max-w-96"
                    >
                        <Form.Root
                            dir="row"
                            submit={handleSubmit}
                        >
                            <Form.Wrapper>
                                <Form.Label
                                    htmlFor="displayName"
                                >
                                    {t("settings.cards.displayName.title")}
                                </Form.Label>
                                <Form.Input
                                    id="displayName"
                                    zodName="displayName"
                                    placeholder={displayName}
                                />
                            </Form.Wrapper>
                            <Button
                                typeButton="blue"
                                type="submit"
                                className="md:max-w-40 md:h-10"
                            >
                                {language === "pt" ? "Salvar" : "Save"}
                            </Button>
                        </Form.Root>
                    </div>
                </Card>

                <Card icon={BriefcaseBusiness} title={t("settings.cards.account.title")} description={t("settings.cards.account.description")}>
                    <div
                        className={`
                        border bg-zinc-200 border-zinc-300 text-zinc-600 
                        dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500"
                        rounded-md py-1 px-3 grid place-items-center
                    `}
                    >
                        <span className="m-0 p-0">
                            admin
                        </span>
                    </div>
                </Card>

                <Card className="md:block hidden" icon={Smile} title={t("settings.cards.avatar.title")} description={t("settings.cards.avatar.description")} column={true}>
                    <div
                        className="
                        flex flex-row justify-center items-center gap-2
                    "
                    >
                        {
                            avatars.map((avatar, index) => {

                                const { height, width, colors, name } = avatar;

                                return (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.1 }}
                                        onClick={() => setAvatar(t, { colors, name }, themeValue)}
                                    >
                                        <Avatar
                                            height={height}
                                            width={width}
                                            name={name}
                                            colors={colors}
                                            variant="marble"
                                        />
                                    </motion.button>
                                )
                            })
                        }
                    </div>
                </Card>

                <Card icon={Info} title={t("settings.cards.aboutSystem.title")} description={t("settings.cards.aboutSystem.description")} />

                <Card icon={DoorOpen} title={t("settings.cards.logout.title")} description={t("settings.cards.logout.description")} column={true}>
                    <Button
                        typeButton="red"
                        type="button"
                        className="md:max-w-40"
                        onClick={() => {
                            logout();
                            setToken(null);
                            navigate("/sign-in");
                        }}
                    >
                        {language === "pt" ? "Sair" : "Exit"}
                    </Button>
                </Card>
            </div>
        </div>
    )
}