import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BillsContextProvider } from './context/BillContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BillsContextProvider>
      <App />
    </BillsContextProvider>
  </React.StrictMode>
);

