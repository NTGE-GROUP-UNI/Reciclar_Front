import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../shared/layout/layout";
import { PrivateRoute } from "@/shared/components/private/private";
import { Dashboard, Fouls, Settings, Classes, ClassPage, SignIn, Error, QrReader } from "@/pages/export-pages"

export const router = createBrowserRouter([
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { element: <Dashboard />, path: "/" },
                    { element: <Settings />, path: "/settings" },
                    { element: <Classes />, path: "/classes" },
                    { element: <Fouls />, path: "/fouls" },
                    { element: <QrReader />, path: "/reader" },
                    { element: <ClassPage />, path: "/classes/:shift/:id" },
                ]
            }
        ]
    },
    {
        element: <SignIn />,
        path: "/sign-in",
    },
    {
        element: <Error statusCode="404" />,
        path: "/*"
    }
]);