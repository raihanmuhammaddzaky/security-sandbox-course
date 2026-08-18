import authService from '../services/authService.js';

const login = (req, res) => {
    const { username, password } = req.body;
    const result = authService.login(username, password);
    
    if (result.success) {
        // VULNERABILITY FIXED: Cookie diset dengan pengaman (HttpOnly, SameSite).
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

export default { login, logout };
