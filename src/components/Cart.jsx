import React, { useContext, useEffect } from 'react';
import { CartContext } from '../hook/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate()
  const { cart, loading, fetchCartItems, removeFromCart, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (cart.length === 0) {
      fetchCartItems();
    }
  }, [cart, fetchCartItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      const productPrice = item.product.price * item.quantity;
      totalPrice += productPrice;
    });
    return totalPrice;
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckOut = () => {
    clearCart();
    navigate('/checkout')
  }

  return (
    <div className="cart-page">
      <h2 style={{ textAlign: 'center', fontSize: '3rem', color: 'white'}}>Carrito de compras</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', fontSize: '3rem', display:'flex'}}>No hay productos en el carrito</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="product-details">
                <img src={item.product.img} alt={item.product.name} className="product-image-cart" />
                <h3 className="product-name">{item.product.name}</h3>
                <p>Precio: ${item.product.price}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <div>
                <div>
                <button className='button_delet' onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ textAlign: 'center'}}>
        <p className='total_price'>Precio total: <span style={{ color: 'red'}}>${calculateTotalPrice()}</span></p>
        
        <button className='button_clear' onClick={handleClearCart}>Vaciar carrito</button>

        <div>
          <button onClick={handleCheckOut} className='button_buy'>HACER PEDIDO</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
