import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { client } from "../../client/client";
import { getUserByUserName } from "../../client/query";
import { AuthApi } from "../../api/AuthApi.js";
import { UserApi } from "../../api/UserApi";

import Cookies from "js-cookie";

import logo from "../../assets/logo.png";

import bcrypt from "bcryptjs";

const Login = () => {
    const [userInput, setUserInput] = useState({ name: "", password: "" });
    const [user, setUser] = useState(null);
    const isMounted = useRef(false);
    const Auth = useContext(AuthApi);
    const CurrentUser = useContext(UserApi);
    const navigate = useNavigate();
    let [count, setCount] = useState(0);
    const [wrong, setWrong] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    // logging every input from user
    const handleChange = (e) => {
        setUserInput((oldInput) => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value,
            };
        });
    };

    // when login attempted check if input match with database
    useEffect(() => {
        console.log(user);
        if (user) {
            if (user.length > 0) {
                bcrypt.compare(
                    userInput.password,
                    user[0]?.hash,
                    (err, result) => {
                        if (result) {
                            setCookie(user);
                            setWrong(false);
                        }
                    }
                );
                console.log(userInput.password);
                console.log(user[0].hash);
            } else {
                console.log("im wronf");

                setWrong(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    //https://typeofnan.dev/how-to-prevent-useeffect-from-running-on-mount-in-react/
    //preventing useEffect being called at mount
    useEffect(() => {
        if (isMounted.current) {
            const { name } = userInput;
            const query = getUserByUserName(name);
            client
                .fetch(query)
                .then((data) => setUser(data))
                .catch(console.error);
        } else {
            isMounted.current = true;
        }
        return () => {
            // isMounted.current = false;
            //cleanup
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleSubmit = () => {
        setCount((c) => c + 1);
    };

    // when login success --> set cookie to browser
    const setCookie = (user) => {
        Auth.setAuth(true);
        CurrentUser.setCurrentUser(user);
        Cookies.set("user", user[0]._id);
        navigate("/", { replace: true });
    };

    return (
        <div>
            <section className='h-screen primary-color'>
                <div className='px-6 h-full text-gray-800'>
                    <div className='flex xl:justify-center w-1000 lg:justify-center justify-center items-center flex-wrap h-full g-6'>
                        <div className='flex flex-col justify-center items-center'>
                            {wrong && (
                                <div
                                    className='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                                    role='alert'
                                >
                                    <svg
                                        aria-hidden='true'
                                        className='flex-shrink-0 inline w-5 h-5 mr-3'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                            clipRule='evenodd'
                                        ></path>
                                    </svg>
                                    <span className='sr-only'>Danger</span>
                                    <div>
                                        <span className='font-medium'>
                                            Login Error
                                        </span>
                                        <ul className='mt-1.5 ml-4 text-red-700 list-disc list-inside'>
                                            <li>
                                                Please ensure Username and
                                                Password is correct
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <div className='p-5 pl-0'>
                                <img src={logo} width='100px' alt='logo' />
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.name}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='name'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Username
                                    </label>
                                </div>
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='password'
                                        name='password'
                                        id='password'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='password'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className='text-center lg:text-left'>
                                    <button
                                        type='submit'
                                        onClick={handleSubmit}
                                        className='w-full inline-block px-7 py-3 secondary-color text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
