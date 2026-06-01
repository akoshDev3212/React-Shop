import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { OrdersContext } from '../context/OrdersContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addOrder({ items: cart, total: total }); 
      clearCart();
      toast.success("Your order has been placed successfully!");
      setLoading(false);
      navigate('/my-orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-black mb-6 text-gray-800">Checkout Information</h2>
      
      <form onSubmit={handleOrder} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="First Name" 
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-blue-500" 
            required 
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-blue-500" 
            required 
          />
        </div>
        
        <input 
          type="text" 
          placeholder="Shipping Address" 
          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-blue-500" 
          required 
        />
        
        <input 
          type="tel" 
          placeholder="Phone Number" 
          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-blue-500" 
          required 
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
          }}
        />

        <div className="border-t pt-6">
          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total:</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Processing...
              </span>
            ) : "Confirm Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;