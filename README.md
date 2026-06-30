# 🍔 Food Restaurant App – Backend

A RESTful backend API for a multi-role food delivery / restaurant ordering platform, built with **Node.js, Express, and MongoDB (Mongoose)**. It supports four user roles — client, admin, vendor, and driver — and provides authentication, restaurant management, category management, food/menu management, and order placement & status tracking.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (JWT) + bcryptjs for password hashing
- **Logging:** Morgan
- **Dev tooling:** Nodemon
- **Other:** CORS, dotenv

## ✨ Features

- User registration & login with hashed passwords
- Role-based users: `client`, `admin`, `vendor`, `driver`
- JWT-based route protection via auth middleware, plus a separate admin middleware for privileged actions
- Profile management: get user, update user, reset password, update password, delete account
- Restaurant CRUD: create, get all, get by ID, delete
- Category CRUD: create, get all
- Food/menu management: create, get all, get by ID, get by restaurant, update, delete
- Order placement and order status updates (admin-only status updates)

## 📁 Project Structure

```
.
├── Controllers/         # Route handler logic
│   ├── authController.js
│   ├── categoryController.js
│   ├── foodController.js
│   ├── restaurantController.js
│   └── userController.js
├── Middlewares/          # Auth & admin guards
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── Models/                # Mongoose schemas
│   ├── categoryModel.js
│   ├── foodModel.js
│   ├── orderModel.js
│   ├── restaurantModel.js
│   └── userModel.js
├── Routes/                # Express routers
│   ├── authRoutes.js
│   ├── authUsers.js
│   ├── categoryRoutes.js
│   ├── foodRoutes.js
│   └── restaurantRoutes.js
├── data.js
├── db.js                  # MongoDB connection
├── server.js              # App entry point
└── package.json
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/Pranayy00/FOOD_RESTAURNT-APP-BACKEND-.git

# Move into the project directory
cd FOOD_RESTAURNT-APP-BACKEND-

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following keys:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the Server

```bash
# Development (with nodemon)
npm run server
```

The server will start on `http://localhost:PORT`.

## 📡 API Endpoints

### Auth — `/api/v1/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login a user |

### User — `/api/v1/user`
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/getUser` | Get logged-in user's profile | ✅ |
| PUT | `/updateUser` | Update user profile | ✅ |
| POST | `/resetPassword` | Reset password | ✅ |
| POST | `/updatePassword` | Update password | ✅ |
| DELETE | `/deleteUser` | Delete account | ✅ |

### Restaurant — `/api/v1/restaurant`
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/create` | Create a restaurant | ✅ |
| GET | `/getAll` | Get all restaurants | ✅ |
| POST | `/getId` | Get restaurant by ID | ❌ |
| POST | `/delRestaurant` | Delete a restaurant | ✅ |

### Category — `/api/v1/category`
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/create` | Create a category | ✅ |
| GET | `/getAll` | Get all categories | ✅ |

### Food — `/api/v1/food`
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/create` | Create a food item | ✅ |
| GET | `/getAll` | Get all food items | ❌ |
| GET | `/get/:id` | Get a food item by ID | ❌ |
| POST | `/getByRestaurant/:id` | Get food items by restaurant | ❌ |
| POST | `/updateFood/:id` | Update a food item | ✅ |
| DELETE | `/deleteFood/:id` | Delete a food item | ✅ |
| POST | `/order` | Place an order | ✅ |
| POST | `/orderStatus/:id` | Update order status | ✅ (admin) |

## 🗄️ Data Models

- **User:** userName, email, password, address, phone, userType (`client`, `admin`, `vendor`, `driver`), profile image, security answer
- **Restaurant:** title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
- **Category:** title, imageUrl
- **Food:** title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant (ref), rating, ratingCount
- **Order:** foods (ref), payment, buyer (ref), status (`preparing`, `prepare`, `on the way`, `deliverd`)

## 🔒 Authentication

Protected routes require a valid JWT, validated via `authMiddleware`. Admin-only routes (e.g. updating order status) are further restricted using `adminMiddleware`.

## 🛠️ Future Improvements

- Input validation (e.g. Joi/express-validator)
- API documentation (Swagger/Postman collection)
- Pagination & filtering on list endpoints
- Payment gateway integration
- Automated tests

## 👤 Author

**Pranay** — [GitHub](https://github.com/Pranayy00)

## 📄 License

ISC
