const { users } = require('../utils/db');

const login = (username, password) => {
    if (users[username] && users[username].password === password) {
        return { success: true, username };
    }
    return { success: false };
};

module.exports = { login };
