import React from "react";
import { AuthApi } from "../../api/AuthApi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const Auth = useContext(AuthApi);
    const navigate = useNavigate();
    const LoggingOut = () => {
        Auth.setAuth(false);
        Cookies.remove("user", { path: "" });
        navigate("/", { replace: true });
    };

    return <div>{LoggingOut()}</div>;
};

export default Logout;
