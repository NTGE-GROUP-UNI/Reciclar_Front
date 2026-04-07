//LUCIDE REACT
import { 
    MoonStar, 
    SunMedium, 
    Bell, 
    Info, 
    DoorOpen, 
    Languages, 
    Smile,
    PersonStanding,
    BriefcaseBusiness, 
    BellRing,
    BellOff
} from "lucide-react";

//STORE
import { setTheme } from "../../store/theme/theme"
import { setNotification } from "../../store/notifications/notifications";
import { setLang } from "../../store/language/language";
import { setAvatar } from "../../store/avatar/avatar";
import { setDisplayName } from "../../store/user/user";

//MOTION
import { motion } from "motion/react";

//BORING AVATAR
import Avatar from "boring-avatars";

//HOOKS
import { useTheme } from "../../hooks/theme/useTheme";
import { useLanguage } from "../../hooks/language/useLanguage";
import { useNotification } from "../../hooks/notifications/useNotification";
import { useUser } from "../../hooks/user/useUser";

//I18N
import { useTranslation } from "react-i18next";

//COMPONENTS
import { Card } from "./components/card/card";
import { ToggleButton } from "./components/toggleButton/ToggleButton";
import { TitleStructure } from "../../components/shared/titleStructure/TitleStructure";

//CONSTANTS
import { avatars } from "./constants/avatars/avatars";
import { Form } from "../../components/shared/form/Form";
import { Button } from "../../components/shared/button/Button";

//TYPE
import type { FormData } from "../../components/shared/form/type";

export const Settings = () => {

    const { themeValue } = useTheme((state) => state);
    const { enable } = useNotification((state) => state);
    const { language } = useLanguage((state) => state);
    const { displayName } = useUser((state) => state);
    const { t } = useTranslation();

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
                            mb-2 transition-colors duration-300
                        "
                    >
                        {t("settings.title")}
                    </h1>
                    <p
                        className="
                            font-medium text-zinc-500 
                            text-md dark:text-zinc-400
                            transition-colors duration-300
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

                <Card icon={Bell} title={t("settings.cards.notifications.title")} description={t("settings.cards.notifications.description")}>
                    <ToggleButton
                        onClick={() => setNotification(t, themeValue)}
                        isActive={!enable}
                    >
                        {enable ? <BellRing height={17} /> : <BellOff height={17} />}
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

                <Card icon={PersonStanding} title={t("settings.cards.displayName.title")} description={t("settings.cards.displayName.description")}>
                    <div
                        className="w-full max-w-96"
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
                                typeButton="default"
                                type="submit"
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
                        py-1 px-3 rounded-md
                    `}
                    >
                        <p>
                            admin
                        </p>
                    </div>
                </Card>

                <Card icon={Smile} title={t("settings.cards.avatar.title")} description={t("settings.cards.avatar.description")}>
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

                <Card icon={DoorOpen} title={t("settings.cards.logout.title")} description={t("settings.cards.logout.description")}>
                    <Button
                        typeButton="danger"
                    >
                        {language === "pt" ? "Sair" : "Exit"}
                    </Button>
                </Card>
            </div>
        </div>
    )
}