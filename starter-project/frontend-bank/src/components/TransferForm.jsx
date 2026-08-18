import React from 'react';
import { useBank } from '../context/BankContext';

export default function TransferForm() {
  const { targetUser, setTargetUser, amount, setAmount, handleTransfer } = useBank();

  return (
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
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2">
          Transfer Sekarang
        </button>
      </form>
    </div>
  );
}
