import { Navigate,Outlet } from "react-router-dom";
import Cookies from "js-cookie"



export const AnonmyousRoutes=()=>{
    
    const token=Cookies.get("token")

    return token?<Navigate to="/" />:<Outlet />
}