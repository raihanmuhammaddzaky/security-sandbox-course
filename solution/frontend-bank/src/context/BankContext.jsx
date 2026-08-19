import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTransaction } from '../hooks/useTransaction';
import { useComments } from '../hooks/useComments';

const BankContext = createContext();

export const useBank = () => {
  return useContext(BankContext);
};

export const BankProvider = ({ children }) => {
  const transaction = useTransaction();
  
  // Memberikan fetchSaldo sebagai callback ketika login berhasil agar saldo otomatis ter-update
  const auth = useAuth(() => {
    transaction.fetchSaldo();
  });
  
  const comments = useComments();

  // Override handleLogout agar juga mereset saldo di UI
  const handleLogout = async () => {
    await auth.handleLogout();
    transaction.setSaldo(0);
  };

  const value = {
    ...auth,
    handleLogout, // kita timpa handleLogout dari auth dengan versi override ini
    ...transaction,
    ...comments
  };

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  );
};
