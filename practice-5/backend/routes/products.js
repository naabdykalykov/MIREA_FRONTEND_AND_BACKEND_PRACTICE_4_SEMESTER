const express = require("express");
const router = express.Router();
const products = require("../data/products.js");

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория
 *         description:
 *           type: string
 *           description: Описание
 *         price:
 *           type: number
 *           description: Цена
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           nullable: true
 *           description: Рейтинг (1-5)
 *         image:
 *           type: string
 *           description: URL изображения
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         rating:
 *           type: number
 *           nullable: true
 *         image:
 *           type: string
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Получить список всех товаров
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Успешный ответ, массив товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", (req, res) => {
  res.json(products);
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Товар не найден" });
  }
  res.json(product);
});

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Товар создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", (req, res) => {
  const { name, category, description, price, stock, rating, image } = req.body;
  const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id,
    name: name || "",
    category: category || "",
    description: description || "",
    price: Number(price) || 0,
    stock: Number(stock) || 0,
    rating: rating != null ? Number(rating) : null,
    image: image || "",
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить товар по ID (частичное обновление)
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Товар обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Товар не найден" });
  }
  const { name, category, description, price, stock, rating, image } = req.body;
  if (name !== undefined) product.name = name;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (rating !== undefined) product.rating = rating != null ? Number(rating) : null;
  if (image !== undefined) product.image = image;
  res.json(product);
});

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар по ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Товар удалён (тело ответа пустое)
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Товар не найден" });
  }
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
