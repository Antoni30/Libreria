import express from "express";
import cors from "cors";
import RouteBookSales from "./routes/sale.routes.js";
import RouteSales_Book from "./routes/sale_books.routes.js"

const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Book Sales Module 📚");
});

// Register routes
app.use("/sales",RouteBookSales);
app.use("/book-sales",RouteSales_Book);

// Start server
const PORT = 2027;
app.listen(PORT, () => {
  console.log(`Run Book Sales Module 📚: http://localhost:${PORT}`);
});
