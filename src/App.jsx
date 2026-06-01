import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar setSearchTerm={setSearchTerm} />
          
          <main className="container mx-auto py-6">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </main>
          
          <footer className="text-center py-6 text-gray-500 border-t mt-10">
            <p>© 2026 Mening Do'konim. Barcha huquqlar himoyalangan.</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;