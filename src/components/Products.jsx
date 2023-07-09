import React, { useState } from 'react';
import products from '../constants';
import { Link } from 'react-router-dom';

const Products = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const item = {
      product,
      quantity: 1,
    };

    setCart([...cart, item]);
  };

  return (
    <div className="products-page">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.img} alt={product.name} className="product-image" />
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <Link onClick={handleAddToCart} to={`/products/${product.id}`}>
            <button>Agregar al carrito</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
