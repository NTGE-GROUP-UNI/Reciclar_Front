import { Outlet } from "react-router-dom"
import { Main } from "./main/main"
import { Footer } from "./footer/footer"
import { Navbar } from "../components/navbar/navbar"

export const Layout = () => {
    return (
        <div
            className="
                min-h-dvh flex flex-col w-full
                bg-zinc-100 dark:bg-zinc-950
            "
        >
            <Navbar />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </div>
    )
}