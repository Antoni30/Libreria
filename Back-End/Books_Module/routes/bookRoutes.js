import { Router } from "express";
import { getBooks, postBook, putBook, deleteBook } from "../controller/bookController.js";

const router = Router();

router.get("/", getBooks);
router.post("/", postBook);
router.put("/:id", putBook);
router.delete("/:id", deleteBook);

export default router;