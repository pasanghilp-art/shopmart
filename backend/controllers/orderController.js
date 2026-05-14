const pool = require('../db/db');

const createOrder = async (req, res) => {
  try {
    const cartItems = await pool.query(
      `SELECT cart.quantity, products.price, products.id as product_id
       FROM cart JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = $1`,
      [req.user.id]
    );
    if (cartItems.rows.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const total = cartItems.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await pool.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
      [req.user.id, total]
    );

    const orderId = order.rows[0].id;
    for (const item of cartItems.rows) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await pool.query('DELETE FROM cart WHERE user_id = $1', [req.user.id]);
    res.status(201).json({ message: 'Order placed', order: order.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await pool.query(
      `SELECT orders.id, orders.total, orders.status, orders.created_at,
       json_agg(json_build_object('product', products.name, 'quantity', order_items.quantity, 'price', order_items.price)) as items
       FROM orders
       JOIN order_items ON orders.id = order_items.order_id
       JOIN products ON order_items.product_id = products.id
       WHERE orders.user_id = $1
       GROUP BY orders.id ORDER BY orders.created_at DESC`,
      [req.user.id]
    );
    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await pool.query(
      `SELECT orders.*, users.name as customer FROM orders
       JOIN users ON orders.user_id = users.id
       ORDER BY orders.created_at DESC`
    );
    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };