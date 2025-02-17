import express from "express";
import cors from "cors";
import RouteBookSales from "./routes/sale_routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Book Sales Module 📚");
});

// Register routes
app.use(RouteBookSales);

// Start server
const PORT = 2027;
app.listen(PORT, () => {
  console.log(`Run Book Sales Module 📚: http://localhost:${PORT}`);
});
