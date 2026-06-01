import { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const { orders, cancelOrder, reorder } = useContext(OrdersContext);
  const { addToCart } = useContext(CartContext);

  // Umumiy hisobotni hisoblash (Barcha buyurtmalar uchun)
  const totalQuantity = orders.reduce((acc, order) => 
    acc + order.items.reduce((sum, item) => sum + item.quantity, 0), 0);
    
  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(id);
      toast.success("Order cancelled successfully!");
    }
  };

  const handleReorder = (items) => {
    reorder(items, addToCart);
    toast.success("Items added to your cart!");
  };

  const getTotalItems = (items) => items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      
      {/* Sticky Summary Bar (image_0e7303.png dagi qizil belgilangan joy) */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md p-6 mb-8 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Total Orders</p>
          <p className="text-2xl font-black">{orders.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">All Items Ordered</p>
          <p className="text-2xl font-black">{totalQuantity} units</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase font-bold">Total Spent</p>
          <p className="text-2xl font-black text-blue-600">${totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <h1 className="text-3xl font-black mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No orders placed yet.</p>
        </div>
      ) : (
        [...orders].reverse().map(order => (
          <div 
            key={order.id} 
            className="bg-white rounded-2xl shadow-lg mb-6 border border-gray-100 overflow-hidden 
                       transition-all duration-300 ease-in-out 
                       hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <span className="font-bold text-gray-700">Order #{order.id}</span>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Status: 
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs ${
                    order.status === 'On the way' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleReorder(order.items)} 
                    className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-lg font-bold hover:bg-green-100 transition"
                  >
                    Buy Again
                  </button>
                  {order.status === "On the way" && (
                    <button 
                      onClick={() => handleCancel(order.id)} 
                      className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold hover:bg-red-100 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <span>{item.title}</span>
                    <span className="font-bold">{item.quantity} x ${item.price}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-xl flex justify-between items-center mt-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Total Items</p>
                  <p className="font-black text-lg">{getTotalItems(order.items)} units</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">Total Amount</p>
                  <p className="font-black text-lg text-blue-400">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;