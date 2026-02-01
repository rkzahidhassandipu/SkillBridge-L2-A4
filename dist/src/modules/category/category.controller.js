import { categoryServices } from "./category.services";
;
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }
        const category = await categoryServices.createCategory(name);
        return res.status(201).json({ success: true, category });
    }
    catch (error) {
        console.error("create category error:", error);
        if (error.message === "Category already exists") {
            return res.status(409).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
const getCategories = async (req, res) => {
    try {
        const categories = await categoryServices.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};
export const categoryController = {
    createCategory,
    getCategories
};
//# sourceMappingURL=category.controller.js.map