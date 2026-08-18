import React from 'react';
import { useBank } from './context/BankContext';
import Login from './components/Login';
import Header from './components/Header';
import TransferForm from './components/TransferForm';
import Guestbook from './components/Guestbook';

export default function App() {
  const { isLoggedIn } = useBank();

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransferForm />
          <Guestbook />
        </div>
      </div>
    </div>
  );
}
