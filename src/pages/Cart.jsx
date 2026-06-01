import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext);
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 md:py-12">
      <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center gap-3">
        <FaShoppingBag className="text-blue-600" /> Your Shopping Cart
      </h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Continue Shopping &rarr;</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                  <p className="text-blue-600 font-black mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                  <button onClick={() => decreaseQuantity(item.id)} className="p-1 hover:text-blue-600"><FaMinus size={12} /></button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="p-1 hover:text-blue-600"><FaPlus size={12} /></button>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-white p-8 rounded-3xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="flex justify-between text-lg mb-4 text-gray-400">
                <span>Total Items:</span>
                <span className="font-bold text-white">{totalItems}</span>
              </div>
              <div className="flex justify-between text-2xl font-black mb-8">
                <span>Total:</span>
                <span className="text-blue-400">${total.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all">
                Proceed to Checkout <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;