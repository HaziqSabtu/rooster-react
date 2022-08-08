import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

//https://stackoverflow.com/questions/71060810/how-to-run-useeffect-before-render-for-authentication
import Login from "./pages/Login/Login.jsx";
import Logout from "./pages/Logout/Logout.js";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting.js";
import Register from "./pages/Register/Register.js";
import Navbar from "./components/Navbar.js";
import ChangeUserName from "./pages/setting/Changeusername.js";
import ChangePassword from "./pages/setting/Changepassword.js";
import ProtectedLogin from "./routes/ProtectedLogin.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import ProtectedRegister from "./routes/ProtectedRegister.js";
import ChangePic from "./pages/setting/Changepic.js";
import Sidebar from "./components/Sidebar.js";
import { client } from "./client/client.js";
import { getUserById } from "./client/query.js";
import { AuthApi } from "./api/AuthApi.js";
import { UserApi } from "./api/UserApi.js";

import Cookies from "js-cookie";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    // read Cookies if available
    // fetch registeered user id from db
    // check if uier id exist in db
    // if match set user info to global
    // set auth to true
    const readCookie = () => {
        const userId = Cookies.get("user");
        if (userId) {
            const query = getUserById(userId);
            client
                .fetch(query)
                .then(console.log("setting"))
                .then((data) => setCurrentUser(data))
                .then(setAuth(true))
                .then(setIsLoading(false))
                .catch(console.error);
        } else {
            setAuth(false);
            setIsLoading(false);
        }
    };

    // read cookie on mount
    useEffect(() => {
        readCookie();
    }, []);

    // render with route
    // some require login auth to acces such as home
    // and blocking login and register form when already login
    if (isLoading) {
        return <div>LOADING</div>;
    } else {
        return (
            <div>
                <AuthApi.Provider value={{ auth, setAuth }}>
                    <UserApi.Provider value={{ currentUser, setCurrentUser }}>
                        <Navbar />
                        <Routes>
                            <Route element={<ProtectedRoute />}>
                                <Route path='/*' element={<Home />} />
                                <Route path='/setting' element={<Setting />} />
                                <Route
                                    path='/setting/changepwd'
                                    element={<ChangePassword />}
                                />
                                <Route
                                    path='/setting/changepic'
                                    element={<ChangePic />}
                                />
                                <Route
                                    path='/setting/changeusername'
                                    element={<ChangeUserName />}
                                />
                            </Route>
                            <Route path='login' element={<ProtectedLogin />}>
                                <Route path='/login' element={<Login />} />
                            </Route>
                            <Route
                                path='register'
                                element={<ProtectedRegister />}
                            >
                                <Route
                                    path='/register'
                                    element={<Register />}
                                />
                            </Route>
                            <Route path='/logout' element={<Logout />}></Route>
                        </Routes>
                    </UserApi.Provider>
                </AuthApi.Provider>
            </div>
        );
    }
};

export default App;
