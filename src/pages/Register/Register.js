// hashing password
// https://medium.com/@vuongtran/using-node-js-bcrypt-module-to-hash-password-5343a2aa2342
// https://www.npmjs.com/package/bcrypt
import React from "react";
import { useState, useEffect, useRef } from "react";

import { client } from "../../client/client";
import { getUserByUserName } from "../../client/query";

import logo from "../../assets/logo.png";

import bcrypt from "bcryptjs";

const Register = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        password: "",
        confirm: "",
    });
    const [userData, setUserData] = useState({});
    const [hash, setHash] = useState();
    const isMounted = useRef(false);
    const saltRounds = 10;
    const [wrong, setWrong] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // logging user Input
    const handleChange = (e) => {
        setUserInput((oldInput) => {
            return {
                ...oldInput,
                [e.target.name]: e.target.value,
            };
        });
    };

    const getHash = () => {
        bcrypt.hash(userInput.password, saltRounds).then((hash) => {
            // Store hash in your password DB.
            setHash(hash);
        });
    };

    // register data after fetch userData
    useEffect(() => {
        if (hash) {
            if (userData.length === 0) {
                const doc = {
                    _type: "user",
                    userName: userInput.name,
                    hash: hash,
                    image: {
                        _type: "image",
                        asset: {
                            _type: "reference",
                            _ref: "image-67a6aefb0f2bc30f87cc30115fc8563a5240c6bc-512x512-jpg",
                        },
                    },
                    profile:
                        "https://cdn.sanity.io/images/u4d5r8ha/production/67a6aefb0f2bc30f87cc30115fc8563a5240c6bc-512x512.jpg",
                };
                client.create(doc).then(() => {
                    setUserInput((oldVal) => {
                        return {
                            ...oldVal,
                            name: "",
                            password: "",
                            confirm: "",
                        };
                    });
                });
            } else {
                console.log("userAlreadyExist");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    // register data after fetch userData
    useEffect(() => {
        if (isMounted.current) {
            if (userData.length !== 0) {
                setWrong(true);
            } else if (userInput.password !== userInput.confirm) {
                setWrong(true);
            } else if (userInput.password === "") {
                setWrong(true);
            } else if (
                userInput.password.length <= 7 ||
                userInput.password.length >= 15
            ) {
                setWrong(true);
            } else {
                setWrong(false);
                getHash();
            }
            console.log("submitting");
            console.log(isMounted.current);
            setIsSubmitted(true);
        } else {
            console.log("mounting");
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    //on form submit fetch registered username
    //then crate new user if username is not exist
    const handleSubmit = () => {
        const query = getUserByUserName(userInput.name);
        client
            .fetch(query)
            .then((data) => {
                setUserData(data);
            })
            .catch(console.error);
    };

    return (
        <div>
            <section className='h-screen primary-color'>
                <div className='px-6 h-full text-gray-800'>
                    <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6'>
                        <div className='flex flex-col justify-center items-center '>
                            {isSubmitted &&
                                (wrong ? (
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
                                                Error while creating account
                                            </span>
                                            <ul className='mt-1.5 ml-4 text-red-700 list-disc list-inside'>
                                                <li>Username already Exist</li>
                                                <li>
                                                    Password cannot be empty
                                                </li>
                                                <li>Minimum length 8</li>
                                                <li>Maximum length 15</li>
                                                <li>
                                                    Old Password does not match
                                                </li>
                                                <li>
                                                    New Password does not match
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg'
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
                                                Account succesfully created
                                            </span>
                                            <ul className='mt-1.5 ml-4 text-green-700 list-disc list-inside'>
                                                <li>
                                                    It can take up to a few
                                                    minutes for your account to
                                                    be set up
                                                </li>
                                                <li>
                                                    <a
                                                        href='/login'
                                                        className='underline underline-offset-auto'
                                                    >
                                                        go to Login
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            <div className='p-5 pl-0'>
                                <img src={logo} width='100px' alt='logo' />
                            </div>
                            <form onSubmit={handleSubmit}>
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
                                <div className='relative z-0 mb-6 w-full group'>
                                    <input
                                        type='password'
                                        name='confirm'
                                        id='confirm'
                                        className='block py-2.5 px-0 w-full text-sm text-white  bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required=''
                                        value={userInput.confirm}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor='confirm'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                    >
                                        Confirm password
                                    </label>
                                </div>
                                <div className='text-center lg:text-left'>
                                    <button
                                        type='button'
                                        onClick={handleSubmit}
                                        className='w-full inline-block px-7 py-3 secondary-color  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                    >
                                        Register
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

export default Register;
