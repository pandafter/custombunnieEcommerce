import React, { useContext, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../constants';
import { CartContext } from '../hook/CartContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const item = {
      product,
      quantity,
    };

    addToCart(item);
    setQuantity(1);

    navigate('/cart');
  };

  if (!product) {
    return <div>El producto no existe.</div>;
  }

  return (
    <div className='product-details-container'>
    <div className="product-details">
      <img src={product.img} alt={product.name} className="product-image-details" />
      <div>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <p style={{ color: 'white'}}>Cantidad: {quantity}</p>
      <div>
        <div style={{ alignContent: 'center', textAlign: 'center'}}>
      <button className='buttons-controler' style={{ margin: 10}} onClick={handleDecrease}>-</button>
      <button className='buttons-controler' onClick={handleIncrease}>+</button>
      </div>
      <button className='button_add' onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
