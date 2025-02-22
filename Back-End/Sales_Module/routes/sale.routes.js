import { Router } from "express";
import { postBookSale, deleteBookSale,getAllBookSales,getBookSaleById,updateBookSale } from "../controller/sales.controller.js";


const router = Router();

// Routes for book sales
router.get("/", getAllBookSales);  // 🔍 Obtener todas las ventas
router.get("/:id", getBookSaleById);  // 📖 Obtener una venta
router.post("/", postBookSale);  // ➕ Insertar una venta
router.put("/:id", updateBookSale);  // ✏️ Actualizar una venta
router.delete("/:id", deleteBookSale);  // ❌ Eliminar una venta


export default router;
