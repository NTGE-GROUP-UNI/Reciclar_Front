import { RouterProvider } from 'react-router-dom'
import { router } from './app/_routes/routes'
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./shared/provider/theme/theme-provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

    const queryClient = new QueryClient();
    
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