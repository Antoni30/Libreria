import { Router } from "express";
import { getBooks, postBook, putBook, deleteBook,getBookById } from "../controller/book.Controller.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", postBook);
router.put("/:id", putBook);
router.delete("/:id", deleteBook);

export default router;