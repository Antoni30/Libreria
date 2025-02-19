import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Usar las rutas de libros
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Books Module");
});

app.listen(2024, () => {
    console.log("Run Books Module 📙: http://localhost:2024");
});