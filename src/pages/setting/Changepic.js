import React from "react";
import { useEffect, useState, useContext, useRef } from "react";

import { client } from "../../client/client";
import { UserApi } from "../../api/UserApi";

import Userinfocard from "../../components/Sidebar";
import SmallSideBar from "../../components/SmallSideBar";

import UploadImagebtn from "./UploadImagebtn";

const ChangePic = () => {
    const isMounted = useRef(false);
    const currentUser = useContext(UserApi);
    let [count, setCount] = useState(0);
    const [assetData, setAssetData] = useState(null);
    const [isSubmited, setIsSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    //preventing useEffect being called at mount
    // change user image in database
    useEffect(() => {
        if (isMounted.current) {
            if (assetData) {
                client
                    .patch(currentUser.currentUser[0]._id)
                    .set({
                        image: {
                            _type: "image",
                            asset: {
                                _type: "reference",
                                _ref: assetData._id,
                            },
                        },
                        profile: assetData.url,
                    })
                    .commit();
                setIsSubmitted(true);
            }
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    //update useEffect
    const handleSubmit = () => {
        setCount((c) => c + 1);
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
                                    {isSubmited && (
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
                                                        It can take up to a few
                                                        minutes for the change
                                                        to be reflected on your
                                                        interface.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {assetData && (
                                        <img
                                            alt='newImage'
                                            src={assetData.url}
                                            className='w-40 rounded-lg mb-3'
                                        />
                                    )}
                                    <form onSubmit={onSubmit}>
                                        <UploadImagebtn
                                            setAssetData={setAssetData}
                                        />
                                        <div className='text-center lg:text-left'>
                                            <button
                                                type='submit'
                                                onClick={
                                                    assetData
                                                        ? handleSubmit
                                                        : ""
                                                }
                                                className='w-full inline-block px-7 py-3 secondary-color text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                            >
                                                Change Image
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

export default ChangePic;
