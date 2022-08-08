//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthApi } from "../api/AuthApi.js";

const ProtectedRoute = () => {
    // receive context from API
    const Auth = useContext(AuthApi);

    // If authorized, return an outlet that will render main
    // If not, return element that will navigate to login page
    return Auth.auth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
