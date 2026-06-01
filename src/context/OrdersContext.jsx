import { createContext, useState, useEffect } from 'react';

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  // LocalStorage dan buyurtmalarni o'qib olish
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('my-shop-orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Buyurtmalar o'zgarganda LocalStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('my-shop-orders', JSON.stringify(orders));
  }, [orders]);

  // Yangi buyurtma qo'shish funksiyasi
  const addOrder = (newOrder) => {
    const customId = Math.floor(1000 + Math.random() * 9000); // 4 xonali unikal ID
    const orderDate = new Date().toLocaleString(); // Buyurtma vaqti (Sana va vaqt)
    
    setOrders((prev) => [
      ...prev, 
      { 
        ...newOrder, 
        id: customId, 
        status: 'On the way', 
        date: orderDate 
      }
    ]);
  };

  // Buyurtmani bekor qilish funksiyasi
  const cancelOrder = (id) => {
    setOrders((prev) => prev.map(order => 
      order.id === id 
        ? { ...order, status: 'Cancelled' } 
        : order
    ));
  };

  // Buyurtmani qayta savatga qo'shish (Buy Again funksiyasi uchun)
  // Buni ishlatish uchun CartContext dan addToCart ni olish kerak
  const reorder = (items, addToCartFunction) => {
    items.forEach(item => addToCartFunction(item));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, cancelOrder, reorder }}>
      {children}
    </OrdersContext.Provider>
  );
};