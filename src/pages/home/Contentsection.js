import React from "react";

const Contentsection = ({ postedBy: { profile, userName }, content }) => {
    return (
        <div className='primary-color border rounded-t-2xl shadow p-5 text-xl text-color-p font-semibold'>
            <div className='flex'>
                <img
                    className='rounded-full border w-8 mr-2'
                    src={profile}
                    alt='postedBy'
                />
                <h3>@{userName}</h3>
            </div>
            {content}
        </div>
    );
};

export default Contentsection;
