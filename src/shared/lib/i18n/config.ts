import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    pt: {
        translation: {
            global: {
                buttons: {
                    excel: "Exportar Excel",
                    search: "Buscar",
                    uploadAgain: "Carregar novamente"
                }
            },
            sidebar: {
                sections: {
                    dashboard: "Painel",
                    classes: "Turmas",
                    fouls: "Faltas",
                    settings: "Configurações",
                }
            },
            settings: {
                title: "Configurações",
                description: "Personalize as configurações do sistema",
                cards: {
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
            },
            dashboard: {
                title: "Painel",
                description: "Gerenciamento de alunos e frequência",
                buttons: {
                    loadAgain: "Carregar Novamente"
                },
                labels: {
                    searchStudent: "Buscar aluno"
                },
                inputs: {
                    searchStudentPlaceholder: "Digite o nome do aluno",
                    filterClass: {
                        value: "Turma",
                        description: "Filtro para turma"
                    },
                    filterShift: {
                        value: "Turno",
                        description: "Filtro para turno"
                    }
                },
                errors: {
                    notFound: "Ops! Não foi possível encontrar..."
                }
            },
            classes: {
                title: "Gestão de Turmas",
                description: "Gerenciamento e controle de turmas",
                buttons: {
                    registerClass: "Cadastrar turma",
                    loadAgain: "Carregar Novamente"
                },
                inputs: {
                    filterClass: {
                        value: "Turma",
                        description: "Filtro para turma"
                    },
                    filterShift: {
                        value: "Turno",
                        description: "Filtro para turno"
                    }
                },
                errors: {
                    notFound: "Ops! Não foi possível encontrar..."
                }
            },
            fouls: {
                title: "Histórico de Faltas",
                description: "Visualize e gerencie todas as faltas registradas",
                buttons: {
                    loadAgain: "Carregar Novamente"
                },
                labels: {
                    searchStudent: "Buscar aluno",
                },
                inputs: {
                    searchStudentPlaceholder: "Digite o nome do aluno",
                    filterClass: {
                        value: "Turma",
                        description: "Filtro para turma"
                    },
                    filterShift: {
                        value: "Turno",
                        description: "Filtro para turno"
                    },
                    filterStatus: {
                        value: "Status",
                        description: "Filtro para status"
                    },
                },
                errors: {
                    notFound: "Ops! Não foi possível encontrar..."
                }
            },
            signIn: {
                title: "Bem-vindo!",
                description: "Entre agora com sua conta",
                buttons: {
                    enter: "Entrar"
                },
                labels: {
                    email: "E-mail",
                    password: "Senha",
                    confirmPassword: "Confirmar senha"
                },
                inputs: {
                    emailPlaceholder: "Insira seu e-mail",
                    passwordPlaceholder: "Insira sua senha",
                    confirmPasswordPlaceholder: "Repita sua senha",
                }
            }
        }
    },

    en: {
        translation: {
            global: {
                buttons: {
                    excel: "Export Excel",
                    search: "Search",
                    uploadAgain: "Upload again"
                }
            },
            sidebar: {
                sections: {
                    dashboard: "Dashboard",
                    classes: "Classes",
                    fouls: "Absences",
                    settings: "Settings",
                }
            },
            settings: {
                title: "Settings",
                description: "Customize system settings",
                cards: {
                    theme: {
                        title: "Change Theme",
                        description: "Switch between light and dark theme",
                        message: "Theme changed successfully"
                    },
                    displayName: {
                        title: "Display Name",
                        description: "Change display name",
                        message: "Display name changed successfully"
                    },
                    account: {
                        title: "Account Type",
                        description: "Current account type",
                    },
                    notifications: {
                        title: "Notifications",
                        description: "Configure system notifications",
                        messageEnable: "Notifications enabled",
                        messageDisabled: "Notifications disabled"
                    },
                    avatar: {
                        title: "Avatar",
                        description: "Change the current avatar",
                        message: "Avatar changed successfully"
                    },
                    logout: {
                        title: "Sign Out",
                        description: "End your current session and return to login screen"
                    },
                    language: {
                        title: "Language",
                        description: "Change the system interface language",
                        message: "Language changed successfully"
                    },
                    aboutSystem: {
                        title: "About the System",
                        description: "Student Management System - Instituto Reciclar | Version 1.0.0 | © 2026 Instituto Reciclar"
                    }
                }
            },
            dashboard: {
                title: "Dashboard",
                description: "Student and attendance management",
                buttons: {
                    loadAgain: "Reload"
                },
                labels: {
                    searchStudent: "Search student"
                },
                inputs: {
                    searchStudentPlaceholder: "Enter student name",
                    filterClass: {
                        value: "Class",
                        description: "Class filter"
                    },
                    filterShift: {
                        value: "Shift",
                        description: "Shift filter"
                    }
                },
                errors: {
                    notFound: "Oops! Couldn't find it..."
                }
            },
            classes: {
                title: "Class Management",
                description: "Management and control of classes",
                buttons: {
                    registerClass: "Register class",
                    loadAgain: "Reload"
                },
                inputs: {
                    filterClass: {
                        value: "Class",
                        description: "Class filter"
                    },
                    filterShift: {
                        value: "Shift",
                        description: "Shift filter"
                    }
                },
                errors: {
                    notFound: "Oops! Couldn't find it..."
                }
            },
            fouls: {
                title: "Absence History",
                description: "View and manage all recorded absences",
                buttons: {
                    loadAgain: "Reload"
                },
                labels: {
                    searchStudent: "Search student",
                },
                inputs: {
                    searchStudentPlaceholder: "Enter student name",
                    filterClass: {
                        value: "Class",
                        description: "Class filter"
                    },
                    filterShift: {
                        value: "Shift",
                        description: "Shift filter"
                    },
                    filterStatus: {
                        value: "Status",
                        description: "Status filter"
                    },
                },
                errors: {
                    notFound: "Oops! Couldn't find it..."
                }
            },
            signIn: {
                title: "Welcome!",
                description: "Sign in to your account",
                buttons: {
                    enter: "Sign In"
                },
                labels: {
                    email: "E-mail",
                    password: "Password",
                    confirmPassword: "Confirm password"
                },
                inputs: {
                    emailPlaceholder: "Enter your e-mail",
                    passwordPlaceholder: "Enter your password",
                    confirmPasswordPlaceholder: "Repeat your password",
                }
            }
        }
    },
}

i18n.use(initReactI18next)
    .init({
        resources, lng: "pt", fallbackLng: "pt", interpolation: {
            escapeValue: false
        }
    })

export default i18n;