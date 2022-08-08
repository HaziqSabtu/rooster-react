import React from "react";
import { useContext } from "react";

import { UserApi } from "../api/UserApi.js";
import imageBuilder from "../client/imageBuilder";

const Sidebar = () => {
    const currentUser = useContext(UserApi);

    return currentUser.currentUser[0] ? (
        <div className='flex flex-col border-x items-center primary-color w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg'>
            {
                <div className='p-5 primary-color sticky top-0'>
                    <img
                        className='rounded-lg place-content-center border border-color-p shadow-lg round'
                        src={imageBuilder(currentUser.currentUser[0].image)
                            .width(250)
                            .height(250)
                            .url()}
                        alt='userInfo'
                    />
                    <div className='pt-2 border-t mt-5 w-full text-center text-2xl font-bold text-color-p'>
                        @{currentUser.currentUser[0].userName}
                    </div>
                </div>
            }
            <div className='w-full h-screen antialiased flex flex-col hover:cursor-pointer'>
                <a
                    className='hover:bg-gray-300 tertiary-color border-y p-3 w-full text-xl text-left text-color-p font-semibold'
                    href='setting'
                >
                    <i className='fa fa-cog text-color-p text-2xl pr-1 pt-1 float-right'></i>
                    Settings
                </a>
                <a
                    className='hover:bg-gray-300 tertiary-color border-b p-3 w-full text-xl text-left text-color-p font-semibold'
                    href='/logout'
                >
                    <i className='fa fa-cog text-color-p text-2xl pr-1 pt-1 float-right'></i>
                    Log out
                </a>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default Sidebar;
