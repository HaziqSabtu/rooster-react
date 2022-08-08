import React from "react";

const CommentList = (props) => {
    const { comment, postedBy } = props.item;
    const { profile, userName } = postedBy;
    return (
        <div className='primary-color border-x border-t shadow p-4 text-lg text-color-p font-semibold'>
            <div className='flex items-center'>
                <img
                    className='rounded-full border w-5 mr-2'
                    src={profile}
                    alt='postedBy'
                />
                <h3 className='text-xs'>@{userName}</h3>
            </div>
            {comment}
        </div>
    );
};

export default CommentList;
