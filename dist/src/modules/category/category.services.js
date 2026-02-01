import { prisma } from "../../lib/prisma";
const createCategory = async (name) => {
    try {
        const existing = await prisma.category.findUnique({ where: { name } });
        if (existing) {
            throw new Error("Category already exists");
        }
        const category = await prisma.category.create({ data: { name } });
        return category;
    }
    catch (error) {
        console.error("Error creating category:", error.message || error);
        throw new Error(error.message || "Failed to create category");
    }
};
const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    }
    catch (error) {
        console.error("Get all categories error:", error);
        throw new Error("Failed to fetch categories");
    }
};
export const categoryServices = {
    createCategory,
    getAllCategories
};
//# sourceMappingURL=category.services.js.map