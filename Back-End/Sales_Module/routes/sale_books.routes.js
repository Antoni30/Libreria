import {Router} from "express";
import { addSaleBookRelation, getSalesBooksRelations, deleteSaleBookRelation,getSalesByBook,getBooksBySale,updateSaleBookRelation } from "../controller/sales_book.controller.js";

const router = Router();

router.post("/", addSaleBookRelation);
router.get("/", getSalesBooksRelations);
router.delete("/", deleteSaleBookRelation);
router.get("/book/:id_book", getSalesByBook);
router.get("/sale/:id_book_sale", getBooksBySale);
router.put("/", updateSaleBookRelation);

export default router;
