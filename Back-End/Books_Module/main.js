import express from "express";
import cons from "cons";
import bodyParser from "body-parser";
import db from "./db.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(cons());
app.use(bodyParser.json());

// Usar las rutas de libros
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Books Module");
});

app.listen(2024, () => {
    console.log("Run Books Module: http://localhost:2024");
});