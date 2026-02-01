import express from "express";
import { categoryController } from "./category.controller";
import auth, { TutorRole } from "../../middlewares/auth";
const router = express.Router();
router.get("/categories", categoryController.getCategories);
router.post("/categories", auth(TutorRole.ADMIN), categoryController.createCategory);
export const categoryRouter = router;
//# sourceMappingURL=category.router.js.map