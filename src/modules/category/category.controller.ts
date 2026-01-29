
import { Request, Response } from "express";
import { categoryServices } from "./category.services";import { success } from "better-auth";
;

const createCategory = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;

        if(!name || name.trim() === ""){
            return res.status(400).json({success: false, message: "Category name is required"})
        }

        const category = await categoryServices.createCategory(name);
        return res.status(201).json({success: true, category})
    } catch (error: any) {
        console.error("create category error:", error)
        if(error.message === "Category already exists"){
            return res.status(409).json({success: false, message: error.message})
        }
        return res.status(500).json({success: false, message: "Something went wrong"})
    }
}


const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryServices.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const categoryController = {
    createCategory,
    getCategories
}