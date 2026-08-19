import { useState, useEffect } from 'react';
import { apiLogin, apiLogout } from '../api/bankApi';

export const useAuth = (onSuccessLogin) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
      if (onSuccessLogin) onSuccessLogin();
    }
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await apiLogin(username, username === 'user1' ? 'password123' : 'hacker');
      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('username', username);
        if (onSuccessLogin) onSuccessLogin();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal terhubung ke server. Pastikan Backend berjalan dan CORS (TODO 1) sudah dikonfigurasi.');
    }
  };

  const handleLogout = async () => {
    await apiLogout();
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return { username, setUsername, isLoggedIn, setIsLoggedIn, handleLogin, handleLogout };
};
