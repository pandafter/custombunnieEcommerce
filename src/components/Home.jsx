import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className='bg_home' style={{ overflowY: 'hidden', height: '50vmax' }}>
      <h1 style={{ fontWeight: 800, fontSize: '5rem', color: 'white', textAlign: 'center' }}>
        Bienvenido a <span className='text_blue_shadow' style={{ color: 'blue' }}>Custom bunnie</span>
      </h1>
      <p style={{ fontWeight: 600, fontSize: '1.5rem', color: 'white', textAlign: 'center' }}>
        Donde puedes hacer lo que mejor sabes hacer, <span className='text_red_shadow' style={{ color: 'red' }}>SER TU MISMO</span>
      </p>
      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <span style={{ fontWeight: 600, color: 'white' }}>echa un vistazo a nuestros productos.</span>
        <br />
        <button onClick={handleNavigateToProducts} className='button_home'>
          PRODUCTS
        </button>
      </div>
    </div>
  );
};

export default Home;
