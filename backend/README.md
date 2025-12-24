# Backend — ShoppyGlobe

This folder contains the Express/MongoDB backend for the ShoppyGlobe e-commerce app.

## Features
- REST API for products, users (auth), and cart operations
- MongoDB via Mongoose
- JWT authentication
- Seed script to populate example data

## Prerequisites
- Node.js 18+ and npm
- A running MongoDB instance or MongoDB connection string

## Install
Run from the `backend` folder:

```bash
npm install
```

## Environment
Create a `.env` file in `backend/` with at least:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — optional server port (defaults in code)

Example `.env`:

```
MONGO_URI=mongodb://localhost:27017/shoppy
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Seed the database
There is a seed file at `backend/seed.js` to populate sample products and users. From the `backend` folder run:

```bash
node seed.js
```

If you prefer, add an npm script to `package.json` for seeding, e.g.:

```json
"scripts": {
  "seed": "node seed.js",
  "dev": "nodemon server.js"
}
```

## Run the server
The `package.json` initially includes only a `test` script. To run the server for development add a script such as `dev` that uses `nodemon` or run directly:

```bash
node server.js
# or with nodemon (installed as devDependency):
npx nodemon server.js
```

## Important files
- `server.js` — application entry and server setup
- `config/db.js` — MongoDB connection helper
- `middleware/authMiddleware.js` — JWT auth middleware
- `models/` — Mongoose models (`User.js`, `Product.js`, `Cart.js`)
- `routes/` — route handlers (`authRoutes.js`, `productRoutes.js`, `cartRoutes.js`)
- `seed.js` — script to seed example data

## API overview
Main API route groups 

- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — user login, returns JWT
- `GET /api/products` — list products
- `GET /api/products/:id` — product details
- `POST /api/cart` — add to cart (authenticated)
- `GET /api/cart` — get cart (authenticated)

Check the route files in `routes/` for exact endpoints and request shapes.

[Github link for backend code](https://github.com/deepikarani2k3/Ecomm/tree/main/backend)
