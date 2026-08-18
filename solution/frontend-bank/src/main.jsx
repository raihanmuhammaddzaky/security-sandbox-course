import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BankProvider } from './context/BankContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BankProvider>
      <App />
    </BankProvider>
  </StrictMode>,
)
