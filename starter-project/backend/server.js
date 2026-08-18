const express = require('express');
const cookieParser = require('cookie-parser');
// TODO 1 (CORS): Import library 'cors' di sini

const app = express();
const port = 5000;

// Middleware bawaan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TODO 1 (CORS): Gunakan middleware cors di sini agar Frontend Bank (localhost:5173) diizinkan mengakses API ini.
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// --- DATABASE SIMULASI (In-Memory) ---
let users = {
    'user1': { id: 'user1', password: 'password123', saldo: 1000000 },
    'hacker': { id: 'hacker', password: 'hacker', saldo: 0 }
};

let comments = [
    { id: 1, text: "Halo, web banknya bagus banget!" },
    { id: 2, text: "Gampang digunakan, mantap." }
];

// --- ENDPOINT LOGIN ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username] && users[username].password === password) {
        // VULNERABILITY: Cookie diset tanpa pengaman (HttpOnly, SameSite).
        // Ini memungkinkan XSS mencuri cookie dan CSRF berhasil.
        // TODO 3 (CSRF): Tambahkan atribut sameSite: 'Lax' (atau Strict) dan httpOnly: true pada options cookie di bawah.
        res.cookie('session_id', username, { 
            // sameSite: 'Lax',
            // httpOnly: true
        });
        
        return res.json({ message: "Login berhasil!", username });
    }
    
    return res.status(401).json({ message: "Username atau password salah!" });
});

// --- ENDPOINT LOGOUT ---
app.post('/logout', (req, res) => {
    res.clearCookie('session_id');
    res.json({ message: "Logout berhasil!" });
});

// --- ENDPOINT SALDO ---
app.get('/saldo', (req, res) => {
    const sessionId = req.cookies.session_id;
    
    if (!sessionId || !users[sessionId]) {
        return res.status(401).json({ message: "Anda belum login!" });
    }
    
    res.json({ saldo: users[sessionId].saldo });
});

// --- ENDPOINT TRANSFER (RENTAN CSRF) ---
app.post('/transfer', (req, res) => {
    // VULNERABILITY: Server HANYA mengecek keberadaan cookie, tanpa memverifikasi dari origin mana request ini datang atau mengecek Anti-CSRF Token.
    const sessionId = req.cookies.session_id;
    
    if (!sessionId || !users[sessionId]) {
        return res.status(401).json({ message: "Anda belum login!" });
    }

    const { targetUser, amount } = req.body;
    const transferAmount = parseInt(amount);

    if (!users[targetUser]) {
        return res.status(404).json({ message: "User tujuan tidak ditemukan!" });
    }

    if (users[sessionId].saldo < transferAmount) {
        return res.status(400).json({ message: "Saldo tidak cukup!" });
    }

    // Lakukan transfer
    users[sessionId].saldo -= transferAmount;
    users[targetUser].saldo += transferAmount;

    console.log(`[TRANSFER] ${sessionId} mengirim Rp ${transferAmount} ke ${targetUser}`);
    
    res.json({ message: `Berhasil mentransfer Rp ${transferAmount} ke ${targetUser}.` });
});

// --- ENDPOINT KOMENTAR (Buku Tamu) ---
app.get('/komentar', (req, res) => {
    res.json(comments);
});

app.post('/komentar', (req, res) => {
    const { text } = req.body;
    
    // VULNERABILITY: Input teks dari pengguna langsung disimpan bulat-bulat ke "database"
    // tanpa sanitasi sama sekali (Stored XSS).
    const newComment = { id: comments.length + 1, text };
    comments.push(newComment);
    
    res.json({ message: "Komentar berhasil ditambahkan!", comment: newComment });
});

app.listen(port, () => {
    console.log(`[Backend Bank] Berjalan di http://localhost:${port}`);
});
