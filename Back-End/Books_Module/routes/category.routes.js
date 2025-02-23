import { Router } from "express";
import { deleteCategory, getCategories, getCategoryById, postCategory, putCategory } from "../controller/category.controller.js";

const router = Router();

router.get("/",getCategories);
router.get("/",getCategoryById);
router.post("/",postCategory);
router.put("/:id",putCategory);
router.delete("/:id",deleteCategory);


export default router;