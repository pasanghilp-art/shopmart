import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data);
      setLoading(false);
    } catch { setLoading(false); }
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchCart();
  };

  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders', {}, { headers: { Authorization: `Bearer ${token}` } });
      alert('Order placed successfully!');
      fetchCart();
    } catch { alert('Error placing order'); }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h1>Your Cart</h1>
      {loading ? <p>Loading...</p> : cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image_url || 'https://via.placeholder.com/80'} alt={item.name} style={styles.img} />
              <div style={styles.info}>
                <h3>{item.name}</h3>
                <p>Rs. {item.price} x {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>Remove</button>
            </div>
          ))}
          <div style={styles.total}>
            <h2>Total: Rs. {total}</h2>
            <button onClick={placeOrder} style={styles.orderBtn}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  item: { display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  img: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' },
  info: { flex: 1 },
  removeBtn: { background: '#e53e3e', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  total: { textAlign: 'right', marginTop: '1rem' },
  orderBtn: { background: '#38a169', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }
};

export default Cart;