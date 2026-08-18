import { comments } from '../utils/db.js';

const getComments = () => {
    return comments;
};

const addComment = (text) => {
    const newComment = { id: comments.length + 1, text };
    comments.push(newComment);
    return newComment;
};

export default { getComments, addComment };
