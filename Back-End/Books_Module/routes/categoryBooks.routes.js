import { Router } from "express";
import{getBooksCategories,getCategoriesByBook,getBooksByCategory,postBookCategory,deleteBookCategory} from '../controller/category_books.controller.js'

const router = Router();


router.get("/books-categories", getBooksCategories);  // 🔍 Obtener todas las relaciones
router.get("/books/:id/categories", getCategoriesByBook);  // 📖 Categorías de un libro
router.get("/categories/:id/books", getBooksByCategory);  // 📚 Libros en una categoría
router.post("/books-categories", postBookCategory);  // ➕ Relacionar libro y categoría
router.delete("/books-categories/:id_category/:id_book", deleteBookCategory);  // ❌ Eliminar relación

export default router;