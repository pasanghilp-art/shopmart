import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛒 Shopmart</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        {user && <Link to="/orders" style={styles.link}>Orders</Link>}
        {user ? (
          <>
            <Link to="/cart" style={styles.link}>Cart</Link>
            <span style={styles.user}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem', background: 'white', color: '#1a1a2e', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  logo: { color: '#1a1a2e', textDecoration: 'none', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-1px', fontFamily: 'Inter, sans-serif' },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  link: { color: '#4a5568', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' },
  user: { color: '#718096', fontSize: '0.9rem' },
  btn: { background: '#1a1a2e', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};

export default Navbar;