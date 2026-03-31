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

//MOTION
import { motion } from "motion/react";

//BORING AVATAR
import Avatar from "boring-avatars";

//HOOKS
import { useTheme } from "../../hooks/theme/useTheme";
import { useLanguage } from "../../hooks/language/useLanguage";
import { useNotification } from "../../hooks/notifications/useNotification";

//I18N
import { useTranslation } from "react-i18next";

//COMPONENTS
import { Card } from "./components/card/card";
import { Form } from "./components/form/Form";
import { ToggleButton } from "./components/toggleButton/ToggleButton";

//CONSTANTS
import { avatars } from "./constants/avatars/avatars";
import { Button } from "./components/button/Button";

export const Settings = () => {

    const { themeValue } = useTheme((state) => state);
    const { enable } = useNotification((state) => state);
    const { language } = useLanguage((state) => state);
    const { t } = useTranslation();

    return (
        <div
            className="
                w-full flex flex-col gap-6 justify-start 
                py-12 items-center px-8
            "
        >
            <Card icon={themeValue ? MoonStar : SunMedium} title={t("settings.theme.title")} description={t("settings.theme.description")}>
                <ToggleButton
                    onClick={() => setTheme(t, !themeValue)}
                    isActive={themeValue}
                >
                    {themeValue ? <SunMedium height={17} /> : <MoonStar height={17} />}
                </ToggleButton>
            </Card>

            <Card icon={Bell} title={t("settings.notifications.title")} description={t("settings.notifications.description")}>
                <ToggleButton
                    onClick={() => setNotification(t, themeValue)}
                    isActive={!enable}
                >
                    {enable ? <BellRing height={17} /> : <BellOff height={17} />}
                </ToggleButton>
            </Card>

            <Card icon={Languages} title={t("settings.language.title")} description={t("settings.language.description")}>
                <ToggleButton
                    onClick={() => setLang(t, themeValue)}
                    isActive={language === "pt"}
                >
                    {language === "pt" ? "PT" : "EN"}
                </ToggleButton>
            </Card>

            <Card icon={PersonStanding} title={t("settings.displayName.title")} description={t("settings.displayName.description")}>
                <Form />
            </Card>

            <Card icon={BriefcaseBusiness} title={t("settings.account.title")} description={t("settings.account.description")}>
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

            <Card icon={Smile} title={t("settings.avatar.title")} description={t("settings.avatar.description")}>
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

            <Card icon={Info} title={t("settings.aboutSystem.title")} description={t("settings.aboutSystem.description")} />

            <Card icon={DoorOpen} title={t("settings.logout.title")} description={t("settings.logout.description")}>
                <Button
                    type="danger"
                >
                    { language === "pt" ? "Sair" : "Exit" }
                </Button>
            </Card>
        </div>
    )
}