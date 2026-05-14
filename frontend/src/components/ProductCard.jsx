import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { token } = useAuth();

  const addToCart = async () => {
    if (!token) return alert('Please login first!');
    try {
      await axios.post('http://localhost:5000/api/cart',
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Added to cart!');
    } catch (err) {
      alert('Error adding to cart');
    }
  };

  return (
    <div style={styles.card}>
      <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.name} style={styles.img} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.category}>{product.category}</p>
      <p style={styles.price}>$. {Number(product.price).toLocaleString()}</p>
      <p style={styles.stock}>Stock: {product.stock}</p>
      <button onClick={addToCart} style={styles.btn}>Add to Cart</button>
    </div>
  );
};

const styles = {
  card: { background: 'white', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'transform 0.2s', cursor: 'pointer' },
  img: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', background: '#f1f5f9' },
  name: { margin: 0, fontSize: '1.1rem', fontWeight: '700' },
  category: { margin: 0, color: '#718096', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  price: { margin: 0, fontWeight: '800', color: '#1a1a2e', fontSize: '1.3rem' },
  stock: { margin: 0, color: '#48bb78', fontSize: '0.85rem' },
  btn: { background: '#1a1a2e', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '0.5rem' }
};

export default ProductCard;