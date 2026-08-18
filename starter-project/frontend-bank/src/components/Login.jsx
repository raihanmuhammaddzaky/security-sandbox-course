import React from 'react';
import { useBank } from '../context/BankContext';

export default function Login() {
  const { username, setUsername, handleLogin } = useBank();

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
