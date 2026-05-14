import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get('http://localhost:5000/api/orders/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setOrders(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>
      {loading ? <p style={styles.msg}>Loading...</p> : orders.length === 0 ? (
        <p style={styles.msg}>No orders yet. <span style={styles.link} onClick={() => navigate('/')}>Start shopping!</span></p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.header}>
              <span style={styles.orderId}>Order #{order.id}</span>
              <span style={{ ...styles.status, background: order.status === 'pending' ? '#fef3c7' : '#d1fae5', color: order.status === 'pending' ? '#92400e' : '#065f46' }}>
                {order.status.toUpperCase()}
              </span>
              <span style={styles.date}>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div style={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} style={styles.item}>
                  <span>{item.product}</span>
                  <span style={styles.qty}>x{item.quantity}</span>
                  <span style={styles.price}>${Number(item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={styles.total}>
              Total: <strong>${Number(order.total).toLocaleString()}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem 3rem', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.5px' },
  msg: { color: '#718096', fontSize: '1.1rem' },
  link: { color: '#1a1a2e', cursor: 'pointer', textDecoration: 'underline' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  orderId: { fontWeight: '700', fontSize: '1.1rem' },
  status: { padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' },
  date: { color: '#718096', fontSize: '0.9rem', marginLeft: 'auto' },
  items: { borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  item: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' },
  qty: { color: '#718096' },
  price: { fontWeight: '600' },
  total: { borderTop: '1px solid #f1f5f9', paddingTop: '1rem', textAlign: 'right', marginTop: '1rem', fontSize: '1.1rem' }
};

export default Orders;