const authService = require('../services/authService');

const login = (req, res) => {
    const { username, password } = req.body;
    const result = authService.login(username, password);
    
    if (result.success) {
        // VULNERABILITY: Cookie diset tanpa pengaman (HttpOnly, SameSite).
        // Ini memungkinkan XSS mencuri cookie dan CSRF berhasil.
        // TODO 3 (CSRF): Tambahkan atribut sameSite: 'Lax' (atau Strict) dan httpOnly: true pada options cookie di bawah.
        res.cookie('session_id', result.username, { 
            sameSite: 'Lax',
            httpOnly: true
        });
        
        return res.json({ message: "Login berhasil!", username: result.username });
    }
    
    return res.status(401).json({ message: "Username atau password salah!" });
};

const logout = (req, res) => {
    res.clearCookie('session_id');
    res.json({ message: "Logout berhasil!" });
};

module.exports = { login, logout };
