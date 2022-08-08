import React from "react";
import { useEffect, useState, useContext, useRef } from "react";

import { client } from "../../client/client";
import { UserApi } from "../../api/UserApi";

import Userinfocard from "../../components/Sidebar";
import SmallSideBar from "../../components/SmallSideBar";

const ChangeUserName = () => {
    const [userInput, setUserInput] = useState("");
    const isMounted = useRef(false);
    const currentUser = useContext(UserApi);
    let [count, setCount] = useState(0);
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
                name: e.target.value,
            };
        });
    };

    //preventing useEffect being called at mount
    useEffect(() => {
        if (isMounted.current) {
            if (userInput) {
                const { name } = userInput;
                client
                    .patch(currentUser.currentUser[0]._id)
                    .set({ userName: name })
                    .commit();
            }
        } else {
            isMounted.current = true;
        }
        setUserInput((oldVal) => {
            return { ...oldVal, name: "" };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    // check if field are filled
    const handleSubmit = () => {
        if (userInput.name.length >= 1 && userInput.name.length <= 15) {
            setWarning(false);
            setCount((c) => c + 1);
        } else {
            setWarning(true);
        }
        setIsSubmitted(true);
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

                    <Userinfocard />

                    <div className='w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased'>
                        <div className='px-6 h-full text-gray-800'>
                            <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
                                <div className='flex flex-col justify-center items-center '>
                                    {isSubmited &&
                                        (warning ? (
                                            <div
                                                class='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
                                                role='alert'
                                            >
                                                <svg
                                                    aria-hidden='true'
                                                    class='flex-shrink-0 inline w-5 h-5 mr-3'
                                                    fill='currentColor'
                                                    viewBox='0 0 20 20'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                                        clip-rule='evenodd'
                                                    ></path>
                                                </svg>
                                                <span class='sr-only'>
                                                    Danger
                                                </span>
                                                <div>
                                                    <span class='font-medium'>
                                                        Ensure that these
                                                        requirements are met:
                                                    </span>
                                                    <ul class='mt-1.5 ml-4 text-red-700 list-disc list-inside'>
                                                        <li>
                                                            Username cannot be
                                                            empty
                                                        </li>
                                                        <li>
                                                            Minimum length 1
                                                        </li>
                                                        <li>
                                                            Maximum length 15
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                class='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg'
                                                role='alert'
                                            >
                                                <svg
                                                    aria-hidden='true'
                                                    class='flex-shrink-0 inline w-5 h-5 mr-3'
                                                    fill='currentColor'
                                                    viewBox='0 0 20 20'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                                        clip-rule='evenodd'
                                                    ></path>
                                                </svg>
                                                <span class='sr-only'>
                                                    Danger
                                                </span>
                                                <div>
                                                    <span class='font-medium'>
                                                        Changes succesful !
                                                    </span>
                                                    <ul class='mt-1.5 ml-4 text-green-700 list-disc list-inside'>
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
                                    <form onSubmit={onSubmit}>
                                        <div className='mb-6'>
                                            <input
                                                type='text'
                                                className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                                id='name'
                                                placeholder='New UserName'
                                                onChange={handleChange}
                                                value={userInput.name}
                                            />
                                        </div>
                                        <div className='text-center lg:text-left'>
                                            <button
                                                type='submit'
                                                onClick={handleSubmit}
                                                className='w-full inline-block px-7 py-3 secondary-color text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                            >
                                                Change UserName
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

export default ChangeUserName;
