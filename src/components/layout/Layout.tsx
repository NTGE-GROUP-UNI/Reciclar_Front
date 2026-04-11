//REACT ROUTER DOM
import { Outlet } from "react-router-dom"

//COMPONENTS
import { Main } from "./main/Main"
import { Footer } from "./footer/Footer"

export const Layout = () => {
    return (
        <div
            className="
                min-h-dvh flex flex-col w-full
                bg-zinc-100 dark:bg-zinc-950
            "
        >
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </div>
    )
}