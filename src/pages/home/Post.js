import React from "react";
import imageBuilder from "../../client/imageBuilder";

import Contentsection from "./Contentsection";
import CommentSection from "./CommentSection";

const Post = ({ item: { comment, image, _id, postedBy, content } }) => {
    return (
        <div className='bg-white mt-3 rounded-2xl'>
            {image != null && (
                <img
                    className='object fill w-full border rounded-t-2xl shadow-lg '
                    src={imageBuilder(image).url()}
                    alt='imgpost'
                />
            )}
            <Contentsection postedBy={postedBy} content={content} />
            <CommentSection comment={comment} commentId={_id} />
        </div>
    );
};

export default Post;
