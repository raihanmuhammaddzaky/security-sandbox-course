import { users } from '../utils/db.js';

const login = (username, password) => {
    if (users[username] && users[username].password === password) {
        return { success: true, username };
    }
    return { success: false };
};

export default { login };
