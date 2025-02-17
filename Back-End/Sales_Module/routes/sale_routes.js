import { Router } from "express";
import { getBookSales, postBookSale, deleteBookSale } from "../controller/sales_controller.js";


const router = Router();

// Routes for book sales
router.get("/sales", getBookSales);
router.post("/sales", postBookSale);
router.delete("/sales/:id", deleteBookSale);

export default router;
