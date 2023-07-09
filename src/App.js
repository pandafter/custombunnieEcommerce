import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import ProductDetailsPage from './components/ProductDetail';
import { CartProvider } from './hook/CartContext';
import Login from './components/Login';
import Check from './components/Check';

function App() {
  return (
    <div className='bg'>
    <BrowserRouter basename='/'>
      <CartProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/checkout' element={<Check />} />

      </Routes>
      </CartProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
