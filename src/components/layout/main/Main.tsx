//INTERFACE
import type { MainProps } from "./interface"

//COMPONENTS
import { Sidebar } from "../../shared/sidebar/Sidebar"

//LUCIDE REACT
import { Megaphone, NotebookTabs, LayoutDashboard, Bolt } from "lucide-react"

//I18N
import { useTranslation } from "react-i18next"

export const Main = ({ children }: MainProps) => {

    const { t } = useTranslation();

    return (
        <main
            className="
                flex-1 flex flex-row
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
                </Sidebar.PathWrapper>
            </Sidebar.Root>
            <div
                className="
                    flex-1 flex pl-[240px]
                " 
            >
                {children}
            </div>
        </main>
    )
}