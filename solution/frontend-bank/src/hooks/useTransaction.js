import { useState } from 'react';
import { apiGetSaldo, apiTransfer } from '../api/bankApi';

export const useTransaction = () => {
  const [saldo, setSaldo] = useState(0);
  const [targetUser, setTargetUser] = useState('');
  const [amount, setAmount] = useState('');

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

  return { saldo, setSaldo, targetUser, setTargetUser, amount, setAmount, fetchSaldo, handleTransfer };
};
