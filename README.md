# 🛒 Shopmart

A full-stack e-commerce web application built with React, Node.js, Express, and PostgreSQL.

**Live Demo:** [shopmart-ten-sigma.vercel.app](https://shopmart-ten-sigma.vercel.app)

---

## 🚀 Features

- **Authentication** — Register and login with JWT-based auth
- **Product Listings** — Browse products with search and category filter
- **Shopping Cart** — Add/remove items, view cart total
- **Order System** — Place orders and view order history
- **Admin Panel** — Admin users can create, update, and delete products
- **Responsive UI** — Clean, modern design with Inter font

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM
- Axios
- CSS-in-JS (inline styles)

**Backend**
- Node.js + Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- dotenv, cors

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → Render PostgreSQL

---

## 📁 Project Structure

```
shopmart/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── db/
│   │   └── db.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProductCard.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Cart.jsx
        │   └── Orders.jsx
        ├── context/
        │   └── AuthContext.jsx
        └── App.jsx
```

---

## 🔌 API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/products | Public |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |
| GET | /api/cart | User |
| POST | /api/cart | User |
| DELETE | /api/cart/:id | User |
| POST | /api/orders | User |
| GET | /api/orders/my | User |
| GET | /api/orders/all | Admin |

---

## ⚙️ Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/pasanghilp-art/shopmart.git
cd shopmart
```

**2. Setup backend**
```bash
cd backend
npm install
```

Create a `.env` file in the root:
```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=shopmart
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret_key
```

Create the database and run the SQL tables in PostgreSQL, then:
```bash
node server.js
```

**3. Setup frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Schema

```sql
users        → id, name, email, password, role, created_at
products     → id, name, description, price, stock, image_url, category, created_at
cart         → id, user_id, product_id, quantity
orders       → id, user_id, total, status, created_at
order_items  → id, order_id, product_id, quantity, price
```

---

## 👨‍💻 Author

**Pasang Tamang**
- GitHub: [@pasanghilp-art](https://github.com/pasanghilp-art)
- linkdein: www.linkedin.com/in/pasang-tamang1
