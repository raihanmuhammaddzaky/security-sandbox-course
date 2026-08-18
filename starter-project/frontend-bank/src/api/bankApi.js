const API_URL = 'http://localhost:5000';

export const apiLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'omit' // TODO 1 (SOP/CORS): Ubah menjadi 'include' agar cookie session dikirim setelah CORS diperbaiki!
  });
  return response;
};

export const apiLogout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST', 
    credentials: 'omit' /* TODO 1: Ubah 'include' */
  });
  return response;
};

export const apiGetSaldo = async () => {
  const response = await fetch(`${API_URL}/saldo`, {
    // credentials: 'omit' // TODO 1: Ubah 'include' agar backend bisa membaca cookie session.
  });
  return response;
};

export const apiTransfer = async (targetUser, amount) => {
  const response = await fetch(`${API_URL}/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // TODO 3 (CSRF): Jika backend sudah mewajibkan token, tambahkan header: 'X-CSRF-Token': 'nilai_token_disini'
    },
    body: JSON.stringify({ targetUser, amount }),
    // credentials: 'omit' // TODO 1: Ubah 'include'
  });
  return response;
};

export const apiGetComments = async () => {
  const response = await fetch(`${API_URL}/komentar`);
  return response;
};

export const apiAddComment = async (text) => {
  const response = await fetch(`${API_URL}/komentar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response;
};
