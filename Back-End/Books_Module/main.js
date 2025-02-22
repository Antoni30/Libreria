import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes.js";
import categoryRoutes from "./routes/category.routes.js"
import categoryBook from "./routes/categoryBooks.routes.js"

const app = express();
app.use(cors());
app.use(express.json());


// Usar las rutas de libros
app.use('/books',bookRoutes);
app.use('/category',categoryRoutes);
app.use(categoryBook);


app.listen(2024, () => {
    console.log("Run Books Module 📙: http://localhost:2024");
});