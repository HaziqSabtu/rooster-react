import { useContext } from "react";

import { UserApi } from "../api/UserApi";

import imageBuilder from "../client/imageBuilder";

const SmallSideBar = () => {
    const currentUser = useContext(UserApi);
    return (
        <div className=' flex flex-row flex-wrap justify-evenly'>
            <img
                className='place-content-center border border-color-p shadow-lg rounded-full'
                src={imageBuilder(currentUser.currentUser[0].image)
                    .width(38)
                    .height(38)
                    .url()}
                alt='userInfo'
            />
            <a href='/setting'>
                <svg
                    className='h-10 w-10 text-teal-500'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />{" "}
                    <circle cx='12' cy='12' r='3' />
                </svg>
            </a>
            <a href='/logout'>
                <svg
                    className='h-10 w-10 text-teal-500'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
                    <path d='M7 12h14l-3 -3m0 6l3 -3' />
                </svg>
            </a>
        </div>
    );
};

export default SmallSideBar;
