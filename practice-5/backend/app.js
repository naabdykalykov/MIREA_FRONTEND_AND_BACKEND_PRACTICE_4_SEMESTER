const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const productsRouter = require("./routes/products.js");
const openapiSpecification = require("./swagger.js");

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/products", productsRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
