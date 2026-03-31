//REACT ROUTER DOM
import { createBrowserRouter } from "react-router-dom";

//COMPONENTS
import { Layout } from "../components/layout/Layout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { SignIn } from "../pages/signin/SignIn";
import { Error } from "../pages/error/Error";
import { Settings } from "../pages/settings/Settings";

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