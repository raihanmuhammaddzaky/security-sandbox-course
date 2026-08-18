import React, { useState, useEffect } from 'react';
// TODO 2 (XSS): Import DOMPurify untuk mensanitasi komentar (di folder solution nanti)
import DOMPurify from 'dompurify';

const API_URL = 'http://localhost:5000';

export default function App() {
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
      // NOTE: Secara default fetch tidak mengirim credential (cookie).
      // Untuk simulasi CSRF yang sukses dan interaksi API dengan cookie, kita perlu 'include'
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: username === 'user1' ? 'password123' : 'hacker' }),
        credentials: 'include' // TODO 1 (SOP/CORS): Ubah menjadi 'include' agar cookie session dikirim setelah CORS diperbaiki!
      });
      
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
    await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' /* TODO 1: Ubah 'include' */ });
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    setSaldo(0);
  };

  const fetchSaldo = async () => {
    try {
      const response = await fetch(`${API_URL}/saldo`, {
        credentials: 'include' // TODO 1: Ubah 'include' agar backend bisa membaca cookie session.
      });
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
      const response = await fetch(`${API_URL}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO 3 (CSRF): Jika backend sudah mewajibkan token, tambahkan header: 'X-CSRF-Token': 'nilai_token_disini'
          'X-CSRF-Token': 'token-rahasia-123'
        },
        body: JSON.stringify({ targetUser, amount }),
        credentials: 'include' // TODO 1: Ubah 'include'
      });
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
      const response = await fetch(`${API_URL}/komentar`);
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
      const response = await fetch(`${API_URL}/komentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment }),
      });
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Bank Nusantara</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Username (contoh: user1)" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded"
              required 
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
            <p className="text-xs text-gray-500 mt-2">Password diabaikan untuk kemudahan simulasi.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center border-t-4 border-blue-600">
          <div>
            <h1 className="text-2xl font-bold">Halo, {username}!</h1>
            <p className="text-gray-600 text-lg">Saldo Anda: <span className="font-bold text-green-600">Rp {saldo.toLocaleString()}</span></p>
          </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">Logout</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Transfer Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Transfer Uang</h2>
            <form onSubmit={handleTransfer} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Pengguna Tujuan</label>
                <input 
                  type="text" 
                  value={targetUser} 
                  onChange={(e) => setTargetUser(e.target.value)}
                  className="border w-full p-2 rounded"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  className="border w-full p-2 rounded"
                  required 
                />
              </div>
              <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2">Transfer Sekarang</button>
            </form>
          </div>

          {/* Guestbook (Vulnerable to XSS) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Buku Tamu</h2>
            <div className="h-48 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
              {comments.map(c => (
                <div key={c.id} className="mb-2 p-2 bg-white rounded border-l-4 border-blue-400 shadow-sm">
                  {/* VULNERABILITY: Merender HTML tanpa sanitasi */}
                  {/* TODO 2 (XSS): Gunakan DOMPurify.sanitize(c.text) di bawah ini */}
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.text) }} />
                </div>
              ))}
            </div>
            <form onSubmit={submitComment} className="flex gap-2">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="border flex-1 p-2 rounded text-sm"
                required
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Kirim</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
