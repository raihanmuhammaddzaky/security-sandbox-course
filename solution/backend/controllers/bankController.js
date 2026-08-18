import bankService from '../services/bankService.js';

const getSaldo = (req, res) => {
    const sessionId = req.cookies.session_id;
    const saldo = bankService.getSaldo(sessionId);
    
    if (saldo === null) {
        return res.status(401).json({ message: "Anda belum login!" });
    }
    res.json({ saldo });
};

const transfer = (req, res) => {
    // VULNERABILITY FIXED: Validasi CSRF Token
    const csrfToken = req.headers['x-csrf-token'];
    if (csrfToken !== 'token-rahasia-123') {
        return res.status(403).json({ message: "CSRF Token tidak valid atau tidak ada!" });
    }

    const sessionId = req.cookies.session_id;
    const { targetUser, amount } = req.body;
    
    const result = bankService.transfer(sessionId, targetUser, amount);
    if (result.error) {
        return res.status(result.status).json({ message: result.error });
    }
    res.json({ message: result.message });
};

export default { getSaldo, transfer };
