const express = require("express");
const cors = require("cors");
const products = require("./data/products");

const app = express();
app.use(cors());
app.use(express.json());

// API to get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// API to get product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

app.listen(5002, () => {
  console.log("Backend running on http://localhost:5002");
});
