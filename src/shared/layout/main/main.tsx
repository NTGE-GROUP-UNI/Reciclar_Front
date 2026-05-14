import type { ReactNode } from "react";
import { Sidebar } from "../../components/sidebar/sidebar"
import { Megaphone, NotebookTabs, LayoutDashboard, Bolt, QrCode, View } from "lucide-react"

export interface MainProps {
    children: ReactNode
}

export const Main = ({ children }: MainProps) => {

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
                        <LayoutDashboard className="flex-shrink-0" /> Painel
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/classes"
                    >
                        <NotebookTabs className="flex-shrink-0" /> Turmas
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/fouls"
                    >
                        <Megaphone className="flex-shrink-0" /> Faltas
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/monitoring"
                    >
                        <View className="flex-shrink-0" /> Monitoramento (Em desenvolvimento)
                    </Sidebar.Path>
                    <Sidebar.Path
                        className="md:hidden flex"
                        to="/reader"
                    >
                        <QrCode className="flex-shrink-0" /> Leitor de QR Code
                    </Sidebar.Path>
                    <Sidebar.Path
                        to="/settings"
                    >
                        <Bolt className="flex-shrink-0" /> Configurações
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