import React from "react";
import { useContext } from "react";

import { UserApi } from "../../api/UserApi";

import Userinfocard from "../../components/Sidebar";
import SmallSideBar from "../../components/SmallSideBar";

const Setting = () => {
    const currentUser = useContext(UserApi);

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
                        <div className='w-full text-xl font-medium text-gray-900 bg-white rounded-lg border border-gray-200 primary-color'>
                            <a
                                type='button'
                                href='/setting/changeusername'
                                className='py-2 px-4 w-full font-medium text-left border-b text-color-p border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
                            >
                                Change User Name
                            </a>
                            <a
                                type='button'
                                href='/setting/changepwd'
                                className='py-2 px-4 w-full font-medium text-left border-b text-color-p border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
                            >
                                Change Password
                            </a>
                            <a
                                type='button'
                                href='/setting/changepic'
                                className='py-2 px-4 w-full font-medium text-left border-b text-color-p border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700'
                            >
                                Change Profile Picture
                            </a>
                            <a
                                disabled
                                type='button'
                                class='py-2 px-4 w-full font-medium text-left rounded-b-lg cursor-not-allowed text-color-p'
                            >
                                Delete Account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
