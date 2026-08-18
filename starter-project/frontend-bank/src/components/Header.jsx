import React from 'react';
import { useBank } from '../context/BankContext';

export default function Header() {
  const { username, saldo, handleLogout } = useBank();

  return (
    <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center border-t-4 border-blue-600">
      <div>
        <h1 className="text-2xl font-bold">Halo, {username}!</h1>
        <p className="text-gray-600 text-lg">Saldo Anda: <span className="font-bold text-green-600">Rp {saldo.toLocaleString()}</span></p>
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}
