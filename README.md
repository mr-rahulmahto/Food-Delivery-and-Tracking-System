# 🍽️ FoodFlow — Food Delivery & Order Tracking System

> A full-stack food ordering and tracking web application for food shops — with a dedicated Admin Panel to manage orders and food items.

![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=flat-square&logo=mongodb)
![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple?style=flat-square&logo=bootstrap)
![Stripe](https://img.shields.io/badge/Stripe-Payments-blue?style=flat-square&logo=stripe)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📖 About the Project

**FoodFlow** is a full-stack food delivery and order tracking system built for food shop owners and their customers. Customers can browse a food menu, add items to cart, place orders (Cash on Delivery or via Stripe), and track their order status in real time. Shop admins get a dedicated panel to manage orders, add or remove food items, and update delivery status.

---

## ✨ Features

### 👤 Customer App
- Browse food menu with category filters
- User registration and login with JWT authentication
- Add items to cart and manage quantities
- Place orders — Cash on Delivery or Stripe Online Payment
- Real-time order status tracking (Food Processing → Out for Delivery → Delivered)
- View complete order history on profile

### 🛠️ Admin Panel
- View all incoming orders with full customer and item details
- Update order status (Processing → Shipped → Delivered)
- Add new food items with image upload
- Remove food items from the menu
- Protected admin-only routes

### ⚙️ Backend API
- RESTful API built with Express.js
- JWT-based authentication middleware
- Stripe payment session creation and webhook verification
- Image upload with Multer
- MongoDB with Mongoose ODM

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Database | MongoDB + Mongoose |
| Backend | Node.js + Express.js |
| Frontend | React 18 + Context API |
| Styling | Bootstrap 5 + Custom CSS |
| Authentication | JWT + bcryptjs |
| Payments | Stripe (session + COD) |
| File Upload | Multer |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## 📁 Project Structure

```
foodflow/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── foodController.js
│   │   ├── orderController.js
│   │   └── cartController.js
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── models/
│   │   ├── userModel.js
│   │   ├── foodModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── foodRoute.js
│   │   ├── orderRoute.js
│   │   └── cartRoute.js
│   ├── uploads/                # Food images stored here
│   └── server.js
│
├── frontend/                   # Customer-facing React app
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar/
│       │   ├── FoodItem/
│       │   ├── FoodDisplay/
│       │   └── Footer/
│       ├── Context/
│       │   └── StoreContext.jsx
│       └── pages/
│           ├── Home/
│           ├── Cart/
│           ├── PlaceOrder/
│           └── MyOrders/
│
└── admin/                      # Admin panel React app
    └── src/
        ├── components/
        │   ├── Navbar/
        │   └── Sidebar/
        └── pages/
            ├── Add/            # Add new food items
            ├── List/           # View & remove food items
            └── Orders/         # View & manage all orders
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB >= 6.x (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Stripe account for online payments

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/foodflow.git
cd foodflow
```

### 2. Install Dependencies

```bash
# Backend
cd backend && npm install

# Customer Frontend
cd ../frontend && npm install

# Admin Panel
cd ../admin && npm install
```

### 3. Configure Environment Variables

```env
VITE_BACKEND_URL=http://localhost:4000
```



| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive JWT token |

### Food Routes — `/api/food`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/list` | — | Get all food items |
| `POST` | `/add` | Admin | Add a new food item with image |
| `DELETE` | `/remove` | Admin | Remove a food item |

### Order Routes — `/api/order`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/place` | User | Place a new order |
| `POST` | `/verify` | — | Verify Stripe payment webhook |
| `POST` | `/userorders` | User | Get logged-in user's orders |
| `GET` | `/list` | Admin | Get all orders |
| `PUT` | `/status` | Admin | Update order delivery status |

### Cart Routes — `/api/cart`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/add` | User | Add item to cart |
| `POST` | `/remove` | User | Remove item from cart |
| `POST` | `/get` | User | Get user's cart data |

---

## 🔑 Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `MONGODB_URI` | backend | MongoDB connection string |
| `JWT_SECRET` | backend | Secret key for JWT signing |
| `STRIPE_SECRET_KEY` | backend | Stripe secret key (from dashboard) |
| `PORT` | backend | Server port (default: 4000) |
| `VITE_BACKEND_URL` | frontend / admin | Backend API base URL |

---

## 💳 Payment Methods

| Method | Flow |
|---|---|
| Cash on Delivery (COD) | Order placed directly, payment collected on delivery |
| Stripe Online Payment | Redirects to Stripe checkout session, verifies via webhook |

---

## 🛡️ Security Notes

- Passwords are hashed with **bcryptjs** before storing in MongoDB.
- All protected routes require a valid **JWT token** in the request header.
- Admin routes are protected with an additional **admin middleware check**.
- Never commit your `.env` file — it is already listed in `.gitignore`.

---

## 🐛 Common Issues

**Icons/images not loading after deployment**

Move all static assets to the `public/` folder and reference them as `/image.png`, or import them directly using ES module imports:

```jsx
import rupeeIcon from '../../assets/rupee.png';
<img src={rupeeIcon} alt="Cash on Delivery" />
```

**MongoDB connection error**

Ensure your MongoDB Atlas cluster has your current IP whitelisted under **Network Access**.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Stripe Docs](https://stripe.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)

---
## 🙏 Deploy In Render
----

- [Foodie](https://food-del-ciz1.onrender.com/)
> Built with care for food shop owners. Happy shipping! 🚀
