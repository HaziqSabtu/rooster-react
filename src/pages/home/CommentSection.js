import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentSection = ({ comment, commentId }) => {
    const generateComment = comment?.map((com) => {
        return <CommentList key={com._key} item={com} />;
    });

    return (
        <div>
            {generateComment}
            <CommentForm commentId={commentId} />
        </div>
    );
};

export default CommentSection;
