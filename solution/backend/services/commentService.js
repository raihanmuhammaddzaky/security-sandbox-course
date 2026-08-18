const { comments } = require('../utils/db');

const getComments = () => {
    return comments;
};

const addComment = (text) => {
    const newComment = { id: comments.length + 1, text };
    comments.push(newComment);
    return newComment;
};

module.exports = { getComments, addComment };
