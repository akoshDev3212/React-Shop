import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. LocalStorage dan ma'lumotni yuklash (yoki bo'sh array)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('my-shop-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Har safar cart o'zgarganda localStorage ni yangilash
  useEffect(() => {
    localStorage.setItem('my-shop-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => prev.map((item) => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        decreaseQuantity, 
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};