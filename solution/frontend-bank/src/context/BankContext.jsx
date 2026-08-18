import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  apiLogin, 
  apiLogout, 
  apiGetSaldo, 
  apiTransfer, 
  apiGetComments, 
  apiAddComment 
} from '../api/bankApi';

const BankContext = createContext();

export const useBank = () => {
  return useContext(BankContext);
};

export const BankProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [comments, setComments] = useState([]);
  
  // Transfer state
  const [targetUser, setTargetUser] = useState('');
  const [amount, setAmount] = useState('');
  
  // Comment state
  const [newComment, setNewComment] = useState('');

  // Cek apakah sudah login dari localStorage untuk UI (session sungguhan tetap di cookie backend)
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
      fetchSaldo();
    }
    fetchComments();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiLogin(username, username === 'user1' ? 'password123' : 'hacker');
      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem('username', username);
        fetchSaldo();
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
    setSaldo(0);
  };

  const fetchSaldo = async () => {
    try {
      const response = await apiGetSaldo();
      if (response.ok) {
        const data = await response.json();
        setSaldo(data.saldo);
      }
    } catch (err) {
      console.error('Gagal mengambil saldo', err);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await apiTransfer(targetUser, amount);
      const data = await response.json();
      alert(data.message);
      if (response.ok) fetchSaldo();
    } catch (err) {
      console.error(err);
      alert('Transfer gagal!');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await apiGetComments();
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Gagal mengambil komentar', err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAddComment(newComment);
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    username, setUsername,
    isLoggedIn, setIsLoggedIn,
    saldo,
    comments,
    targetUser, setTargetUser,
    amount, setAmount,
    newComment, setNewComment,
    handleLogin,
    handleLogout,
    handleTransfer,
    submitComment
  };

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  );
};
