//I18N
import i18n from "./lib/i18n/config"

//REACT ROUTER DOM
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

//REACT
import { useEffect } from "react"

//HOOKS
import { useLanguage } from "./hooks/language/useLanguage"

//REACT HOT TOAST
import { Toaster } from "react-hot-toast"


//PROVIDERS
import { ThemeProvider } from "./provider/theme/themeProvider"

function App() {

    const language = useLanguage((state) => state.language);

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    return (
        <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster position="bottom-left" containerStyle={{ bottom: 50, left: 32 }} />
        </ThemeProvider>
    )
}

export default App;