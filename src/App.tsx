import i18n from "./shared/lib/i18n/config"
import { RouterProvider } from 'react-router-dom'
import { router } from './app/_routes/routes'
import { useEffect } from "react"
import { useLanguage } from "./shared/hooks/language/useLanguage"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./shared/provider/theme/themeProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

    const language = useLanguage((state) => state.language);
    const queryClient = new QueryClient();

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <ThemeProvider>
                <RouterProvider router={router} />
                <Toaster position="bottom-left" containerStyle={{ bottom: 50, left: 32 }} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App;