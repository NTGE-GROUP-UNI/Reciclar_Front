import type { MainProps } from "./interface"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Megaphone, NotebookTabs, LayoutDashboard, Bolt, QrCode } from "lucide-react"
import { useTranslation } from "react-i18next"

export const Main = ({ children }: MainProps) => {

    const { t } = useTranslation();

    return (
        <main
            className="
                flex-1 flex flex-row pt-[56px]
                font-inter bg-transparent justify-between
            "
        >
            <Sidebar.Root>
                <Sidebar.Profile />
                <Sidebar.PathWrapper>
                    <Sidebar.Path
                        to="/"
                    >
                        <LayoutDashboard /> {t("sidebar.sections.dashboard")}
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/classes"
                    >
                        <NotebookTabs /> {t("sidebar.sections.classes")}
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/fouls"
                    >
                        <Megaphone /> {t("sidebar.sections.fouls")}
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/settings"
                    >
                        <Bolt /> {t("sidebar.sections.settings")}
                    </Sidebar.Path>
                    <Sidebar.Path
                        className="md:hidden flex"
                        to="/reader"
                    >
                        <QrCode /> Leitor de QR Code
                    </Sidebar.Path>
                </Sidebar.PathWrapper>
            </Sidebar.Root>
            <div
                className="
                    flex-1 flex pl-0 md:pl-[240px]
                "
            >
                {children}
            </div>
        </main>
    )
}