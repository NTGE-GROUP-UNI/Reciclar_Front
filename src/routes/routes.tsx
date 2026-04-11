/*=========== REACT ROUTER DOM (LIB) ===========*/
import { createBrowserRouter } from "react-router-dom";

/*=========== COMPONENTS ===========*/
import { Layout } from "../components/layout/Layout";

/*=========== PAGES ===========*/
import { 
    Dashboard,
    Error,
    Classes, 
    Settings,
    SignIn,
    Fouls
} from "@/pages/pages";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <Dashboard />,
                path: "/",
            },
            {
                element: <Settings />,
                path: "/settings",
            },
            {
                element: <Classes />,
                path: "/classes",
            },
            {
                element: <Fouls />,
                path: "/fouls",
            },
        ]
    },
    {
        element: <SignIn />,
        path: "/sign-in",
    },
    {
        element: <Error 
            statusCode="404"
        />,
        path: "/*"
    }
]);