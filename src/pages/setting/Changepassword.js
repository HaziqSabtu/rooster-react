import React from "react";
import { useEffect, useState, useContext, useRef } from "react";

import { client } from "../../client/client";
import { UserApi } from "../../api/UserApi";

import Sidebar from "../../components/Sidebar";
import SmallSideBar from "../../components/SmallSideBar";

import bcrypt from "bcryptjs";

const ChangePassword = () => {
    const [userInput, setUserInput] = useState({
        oldPassword: "",
        newPassword: "",
        confirm: "",
    });
    const isMounted = useRef(false);
    const currentUser = useContext(UserApi);
    let [count, setCount] = useState(0);
    const [hash, setHash] = useState("");
    const saltRounds = 10;
    const [warning, setWarning] = useState(false);
    const [isSubmited, setIsSubmitted] = useState(false);

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

    const getHash = async () => {
        await bcrypt.hash(userInput.newPassword, saltRounds).then((hash) => {
            // Store hash in your password DB.
            setHash(hash);
        });
    };

    //hash password
    useEffect(() => {
        if (hash) {
            if (userInput) {
                client
                    .patch(currentUser.currentUser[0]._id)
                    .set({ hash: hash })
                    .commit();
            }
            console.log("hashed");
        }
        setUserInput((oldVal) => {
            return { ...oldVal, oldPassword: "", newPassword: "", confirm: "" };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    //preventing useEffect being called at mount
    useEffect(() => {
        if (isMounted.current) {
            console.log("hashing");
            getHash();
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    // compare Password input check for error
    const handleSubmit = async () => {
        const res = await compareAsync(
            userInput.oldPassword,
            currentUser.currentUser[0]?.hash
        );
        if (!res) {
            setWarning(true);
        } else if (userInput.newPassword !== userInput.confirm) {
            setWarning(true);
        } else if (userInput.newPassword === "") {
            setWarning(true);
        } else if (
            userInput.newPassword.length <= 7 ||
            userInput.newPassword.length >= 15
        ) {
            setWarning(true);
        } else {
            setWarning(false);
            setCount((c) => c + 1);
        }
        setIsSubmitted(true);
    };

    // wait for api to return comapre password
    const compareAsync = (param1, param2) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(param1, param2, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    };

    return (
        <div>
            <div className='w-full flex flex-row flex-wrap'>
                <div className='w-full primary-color h-screen flex flex-row flex-wrap justify-center '>
                    {currentUser.currentUser[0] ? (
                        <div className='z-50 secondary-color shadow-lg border-t-4 border-teal-500 absolute bottom-0 w-full md:w-0 md:hidden p-3'>
                            <SmallSideBar />
                        </div>
                    ) : (
                        ""
                    )}

                    <Sidebar />

                    <div className='w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased'>
                        <div className='px-6 h-full text-gray-800'>
                            <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
                                <div className='flex flex-col justify-center items-center '>
                                    {isSubmited &&
                                        (warning ? (
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
                                                <span className='sr-only'>
                                                    Danger
                                                </span>
                                                <div>
                                                    <span className='font-medium'>
                                                        Ensure that these
                                                        requirements are met:
                                                    </span>
                                                    <ul className='mt-1.5 ml-4 text-red-700 list-disc list-inside'>
                                                        <li>
                                                            Password cannot be
                                                            empty
                                                        </li>
                                                        <li>
                                                            Minimum length 8
                                                        </li>
                                                        <li>
                                                            Maximum length 15
                                                        </li>
                                                        <li>
                                                            Old Password does
                                                            not match
                                                        </li>
                                                        <li>
                                                            New Password does
                                                            not match
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
                                                <span className='sr-only'>
                                                    Danger
                                                </span>
                                                <div>
                                                    <span className='font-medium'>
                                                        Changes succesful !
                                                    </span>
                                                    <ul className='mt-1.5 ml-4 text-green-700 list-disc list-inside'>
                                                        <li>
                                                            It can take up to a
                                                            few minutes for the
                                                            change to be
                                                            reflected on your
                                                            interface.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-6'>
                                            <input
                                                type='password'
                                                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                name='oldPassword'
                                                id='oldPassword'
                                                placeholder='Old Password'
                                                onChange={handleChange}
                                                value={userInput.oldPassword}
                                            />
                                        </div>
                                        <div className='mb-6'>
                                            <input
                                                type='password'
                                                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                name='newPassword'
                                                id='newPassword'
                                                placeholder='New Password'
                                                onChange={handleChange}
                                                value={userInput.newPassword}
                                            />
                                        </div>
                                        <div className='mb-6'>
                                            <input
                                                type='password'
                                                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                name='confirm'
                                                id='confirm'
                                                placeholder='Confirm Password'
                                                onChange={handleChange}
                                                value={userInput.confirm}
                                            />
                                        </div>
                                        <div className='text-center lg:text-left'>
                                            <button
                                                type='submit'
                                                onClick={handleSubmit}
                                                className='w-full inline-block px-7 py-3 secondary-color text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
