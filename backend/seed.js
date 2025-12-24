const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "iPhone 15",
    price: 79999,
    description: "Latest Apple smartphone",
    stock: 10
  },
  {
    name: "Samsung Galaxy S24",
    price: 69999,
    description: "Flagship Android phone",
    stock: 8
  },
  {
    name: "MacBook Air M2",
    price: 114999,
    description: "Apple laptop with M2 chip",
    stock: 5
  },
  {
    name: "Wireless Headphones",
    price: 2499,
    description: "Noise cancelling headphones",
    stock: 20
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany(); // optional: clear old data
    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
