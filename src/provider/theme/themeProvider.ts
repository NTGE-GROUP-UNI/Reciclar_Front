//HOOKS
import { useTheme } from "../../hooks/theme/useTheme";

//REACT
import { useEffect, type ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const theme = useTheme((state) => state.themeValue);

    useEffect(() => {
        
        const root = document.documentElement;
        !theme ? root.classList.add("dark") : root.classList.remove("dark");

    }, [theme]);

    return children;
}