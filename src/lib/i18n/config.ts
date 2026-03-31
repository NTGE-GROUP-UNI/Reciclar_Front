import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    pt: {
        translation: {
            sidebar: {
                sections: {
                    dashboard: "Painel",
                    classes: "Turmas",
                    fouls: "Faltas",
                    settings: "Configurações",
                }
            },
            settings: {
                theme: {
                    title: "Alterar Tema",
                    description: "Altere entre o tema claro e escuro",
                    message: "Tema alterado com sucesso"
                },
                displayName: {
                    title: "Nome de exibição",
                    description: "Altere o nome de exibição",
                    message: "Nome de exibição alterado com sucesso"
                },
                account: {
                    title: "Tipo da conta",
                    description: "Tipo da conta atual",
                },
                notifications: {
                    title: "Notificações",
                    description: "Configure as notificações do sistema",
                    messageEnable: "Notificações ativadas",
                    messageDisabled: "Notificações desativadas"
                },
                avatar: {
                    title: "Avatar",
                    description: "Altere o avatar utilizado",
                    message: "Avatar alterado com sucesso"
                },
                logout: {
                    title: "Sair do sistema",
                    description: "Finalize sua sessão atual e retorne à tela de login"
                },
                language: {
                    title: "Idioma",
                    description: "Altere o idioma da interface do sistema",
                    message: "Language changed successfully"
                },
                aboutSystem: {
                    title: "Sobre o Sistema",
                    description: "Sistema de Gestão de Alunos - Instituto Reciclar | Versão 1.0.0 | © 2026 Instituto Reciclar"
                }
            }
        }
    },
    en: {
        translation: {
            sidebar: {
                sections: {
                    dashboard: "Dashboard",
                    classes: "Classes",
                    fouls: "Fouls",
                    settings: "Settings",
                }
            },
            settings: {
                theme: {
                    title: "Change Theme",
                    description: "Switch between light and dark mode",
                    message: "Theme changed successfully"
                },
                displayName: {
                    title: "Display name",
                    description: "Change the display name",
                    message: "Display name changed successfully"
                },
                account: {
                    title: "Account Type",
                    description: "Current account type",
                },
                notifications: {
                    title: "Notifications",
                    description: "Configure system notifications",
                    messageEnable: "Notifications on",
                    messageDisabled: "Notifications off"
                },
                avatar: {
                    title: "Avatar",
                    description: "Change the avatar used",
                    message: "Avatar successfully changed"
                },
                logout: {
                    title: "Log out",
                    description: "End your current session and return to the login screen"
                },
                language: {
                    title: "Language",
                    description: "Change the application interface language",
                    message: "Idioma alterado com sucesso"
                },
                aboutSystem: {
                    title: "About the System",
                    description: "Student Management System - Instituto Reciclar | Version 1.0.0 | © 2026 Instituto Reciclar"
                }
            }
        }
    },
}

i18n.use(initReactI18next)
.init({ resources, lng: "pt", fallbackLng: "pt", interpolation: {
    escapeValue: false
} })

export default i18n;