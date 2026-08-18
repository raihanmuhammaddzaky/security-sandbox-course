const commentService = require('../services/commentService');

const getComments = (req, res) => {
    res.json(commentService.getComments());
};

const addComment = (req, res) => {
    const { text } = req.body;
    
    // VULNERABILITY: Input teks dari pengguna langsung disimpan bulat-bulat ke "database"
    // tanpa sanitasi sama sekali (Stored XSS).
    const newComment = commentService.addComment(text);
    
    res.json({ message: "Komentar berhasil ditambahkan!", comment: newComment });
};

module.exports = { getComments, addComment };
