const { users } = require('../utils/db');

const getSaldo = (sessionId) => {
    if (!sessionId || !users[sessionId]) return null;
    return users[sessionId].saldo;
};

const transfer = (sessionId, targetUser, amount) => {
    if (!sessionId || !users[sessionId]) {
        return { error: "Anda belum login!", status: 401 };
    }
    const transferAmount = parseInt(amount);
    if (!users[targetUser]) {
        return { error: "User tujuan tidak ditemukan!", status: 404 };
    }
    if (users[sessionId].saldo < transferAmount) {
        return { error: "Saldo tidak cukup!", status: 400 };
    }
    
    users[sessionId].saldo -= transferAmount;
    users[targetUser].saldo += transferAmount;
    console.log(`[TRANSFER] ${sessionId} mengirim Rp ${transferAmount} ke ${targetUser}`);
    return { success: true, message: `Berhasil mentransfer Rp ${transferAmount} ke ${targetUser}.` };
};

module.exports = { getSaldo, transfer };
