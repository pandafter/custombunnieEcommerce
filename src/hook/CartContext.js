import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartItemsQuery = query(collection(db, 'carts'), where('userId', '==', user.uid));
        const cartItemsSnapshot = await getDocs(cartItemsQuery);
        const items = cartItemsSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCart(items);
      }
      setLoading(false);
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (item) => {
    const user = auth.currentUser;
    if (user) {
      const newItem = {
        ...item,
        userId: user.uid,
      };

      try {
        const docRef = await addDoc(collection(db, 'carts'), newItem);
        setCart([...cart, { id: docRef.id, ...newItem }]);
        console.log('Item added to cart collection', newItem);
      } catch (error) {
        console.log('Error adding item to cart collection:', error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const cartItemRef = doc(db, 'carts', itemId);
      await deleteDoc(cartItemRef);
      setCart(cart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const cartItemsQuery = query(collection(db, 'carts'), where('userId', '==', user.uid));
        const cartItemsSnapshot = await getDocs(cartItemsQuery);
        cartItemsSnapshot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setCart([]);
        console.log('Cart cleared');
      }
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
