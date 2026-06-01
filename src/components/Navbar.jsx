import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = ({ setSearchTerm }) => {
  const { cart } = useContext(CartContext);
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black text-blue-600 italic tracking-tighter">
          SHOP-EX
        </Link>
        
        <div className="hidden md:flex items-center relative">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Find your product..." 
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>

          <Link to="/my-orders" className="text-gray-700 font-bold hover:text-blue-600">
            My Orders
          </Link>

          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-all">
            <FaShoppingCart size={22} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;