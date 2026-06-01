import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext'; // <--- Buni import qiling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <OrdersProvider> {/* <--- OrdersProvider ni qo'shing */}
        <App />
      </OrdersProvider>
    </CartProvider>
  </React.StrictMode>
);