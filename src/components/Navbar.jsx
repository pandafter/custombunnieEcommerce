import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/logo_negro_fondo_blanco.png';
import { signOut, getAuth } from 'firebase/auth';

const Navbar = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <img style={{ borderRadius: '50%'}} src={logo} alt="logo" className="logo" />
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {user ? (
          <li>
            <span style={{ fontWeight: 600, color: 'white', marginRight: 10, textDecoration: 'underline'}}>{user.displayName || user.email}</span>
            <button style={{ border: 'none', borderRadius: '15px', width: '22%', height: '100%', fontSize: '0.9rem', marginRight: 15}} onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login/Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
