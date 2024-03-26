
import Cookies from "js-cookie"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate,Outlet } from "react-router-dom";


export const RequireAuth = () => {
    let isLoggedIn=Cookies.get('token');
   
    console.log(isLoggedIn)
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}