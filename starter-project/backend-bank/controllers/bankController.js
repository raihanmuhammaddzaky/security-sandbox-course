const bankService = require('../services/bankService');

const getSaldo = (req, res) => {
    const sessionId = req.cookies.session_id;
    const saldo = bankService.getSaldo(sessionId);
    
    if (saldo === null) {
        return res.status(401).json({ message: "Anda belum login!" });
    }
    res.json({ saldo });
};

const transfer = (req, res) => {
    // VULNERABILITY: Server HANYA mengecek keberadaan cookie, tanpa memverifikasi dari origin mana request ini datang atau mengecek Anti-CSRF Token.
    const sessionId = req.cookies.session_id;
    const { targetUser, amount } = req.body;
    
    const result = bankService.transfer(sessionId, targetUser, amount);
    if (result.error) {
        return res.status(result.status).json({ message: result.error });
    }
    res.json({ message: result.message });
};

module.exports = { getSaldo, transfer };
