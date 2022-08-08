import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthApi } from "../api/AuthApi";

import Cookies from "js-cookie";

import logo from "../assets/logo.png";

const Navbar = () => {
    const [isHidden, setIsHidden] = useState(true);
    const Auth = useContext(AuthApi);
    const navigate = useNavigate();

    // toggle navbar
    const handleToggle = () => {
        setIsHidden((state) => !state);
    };

    const handleTitle = () => {
        navigate("/", { replace: true });
    };

    return (
        <div>
            <nav
                className='secondary-color flex items-center justify-between flex-wrap p-6 cursor-pointer'
                id='navbar'
            >
                <div
                    onClick={handleTitle}
                    className='flex items-center flex-shrink-0 text-white mr-6'
                >
                    <img
                        className='fill-current h-8 w-8 mr-2'
                        width='54'
                        height='54'
                        viewBox='0 0 54 54'
                        src={logo}
                        alt='logo'
                    ></img>
                    <a className='font-semibold text-xl tracking-tight'>
                        Rooster
                    </a>
                </div>
                <div className='block lg:hidden'>
                    <button
                        onClick={handleToggle}
                        className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'
                    >
                        <svg
                            className='fill-current h-3 w-3'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <title>Menu</title>
                            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                        </svg>
                    </button>
                </div>
                <div
                    className={
                        isHidden
                            ? "hidden w-full flex-grow lg:flex lg:items-center lg:w-auto"
                            : "block w-full flex-grow lg:flex lg:items-center lg:w-auto"
                    }
                >
                    {/* render component only if authenticated */}
                    {Auth.auth && (
                        <div>
                            <a
                                href='/setting'
                                id='setting'
                                className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
                            >
                                Setting
                            </a>
                            <a
                                href='/logout'
                                id='logout'
                                className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
                            >
                                Logout
                            </a>
                        </div>
                    )}

                    {/* render component only if NOT authenticated */}
                    {!Auth.auth && (
                        <div>
                            <a
                                href='/register'
                                className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
                            >
                                Register
                            </a>
                            <a
                                href='/login'
                                className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
                            >
                                Login
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
