import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get('https://shopmart-foyf.onrender.com/api/products')
      .then(res => { setProducts(res.data); setFiltered(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [search, category, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Discover Our Collection</h1>
        <p style={styles.subtitle}>Premium products at the best prices</p>
      </div>

      <div style={styles.controls}>
        <input
          style={styles.search}
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{ ...styles.catBtn, ...(category === cat ? styles.catActive : {}) }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? <p style={styles.msg}>Loading...</p> : filtered.length === 0 ? (
        <p style={styles.msg}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto' },
  hero: { textAlign: 'center', padding: '3rem 0 2rem' },
  title: { fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '0.5rem' },
  subtitle: { color: '#718096', fontSize: '1.1rem' },
  controls: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' },
  search: { padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '1rem', width: '100%', maxWidth: '400px', outline: 'none', fontFamily: 'Inter, sans-serif' },
  categories: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  catBtn: { padding: '0.5rem 1.2rem', borderRadius: '20px', border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#4a5568' },
  catActive: { background: '#1a1a2e', color: 'white', border: '1.5px solid #1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' },
  msg: { textAlign: 'center', color: '#718096', marginTop: '3rem', fontSize: '1.1rem' }
};

export default Home;