import { isMobile } from "react-device-detect";
import { Navigate, Outlet } from "react-router-dom";

export const MobileProtect = () => {
    
    if(isMobile){
        return <Outlet />
    }

    return <Navigate to={"/"} replace/>

}