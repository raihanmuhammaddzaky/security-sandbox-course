import commentService from '../services/commentService.js';

const getComments = (req, res) => {
    res.json(commentService.getComments());
};

const addComment = (req, res) => {
    const { text } = req.body;
    // NOTE: Sanitasi XSS di sini (Backend) opsional jika frontend sudah melakukan DOMPurify.
    // Tapi akan lebih aman jika disanitasi di backend juga menggunakan library seperti xss.
    const newComment = commentService.addComment(text);
    res.json({ message: "Komentar berhasil ditambahkan!", comment: newComment });
};

export default { getComments, addComment };
