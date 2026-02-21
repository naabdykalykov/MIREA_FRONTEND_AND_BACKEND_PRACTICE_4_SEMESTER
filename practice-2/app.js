const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  {
    id: 1,
    name: "Часы",
    price: 100,
  },
  {
    id: 2,
    name: "Сумка",
    price: 150,
  },
  {
    id: 3,
    name: "Кошелёк",
    price: 110,
  },
];

app.get("/", (req, res) => {
  res.send("Продукты");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  let product = products.find((u) => u.id == req.params.id);
  if (!product) {
    return res.status(400).json({ message: "Товар не найден" });
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.patch("/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Товар не найден" });
  }
  const { name, price } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const existed = products.some((p) => p.id == id);
  if (!existed) {
    return res.status(404).json({ message: "Товар не найден" });
  }
  products = products.filter((p) => p.id != id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
