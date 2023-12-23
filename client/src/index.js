import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

import { BillsContextProvider } from './context/BillContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BillsContextProvider>
        <App />
      </BillsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

