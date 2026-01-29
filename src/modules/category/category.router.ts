import express, { Router } from "express";
import { categoryController } from "./category.controller";

const router = express.Router();


router.get("/categories", categoryController.getCategories)
router.post("/categories", categoryController.createCategory)

export const categoryRouter: Router = router