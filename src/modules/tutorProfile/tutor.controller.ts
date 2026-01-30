import { Request, Response } from "express";
import { tutorProfileServices } from "./tutor.services";
import { success } from "better-auth";

const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { bio, pricePerHour, categoryIds } = req.body;

    const profile = await tutorProfileServices.createTutorProfile(
      userId,
      bio,
      pricePerHour,
      categoryIds,
    );
    res.status(201).json({
        success: true,
        profile
    })
  } catch (error: any) {
    res.status(400).json({
        success: false,
        message: error.message
    })
  }
};


const getMyTUtorProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const profile = await tutorProfileServices.getTutorProfileByUserId(userId);

        res.json({
            success: true,
            profile
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

const updateTutorProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const {bio, pricePerHour, categoryIds} = req.body;

        const profile = await tutorProfileServices.updateTutorProfile(userId, bio, pricePerHour, categoryIds);

        res.json({
            success: true,
            profile
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


const getAllTutors = async (req: Request, res: Response) => {
    try {
        const {categoryId, minPrice, maxPrice} = req.query;

        const tutors = await tutorProfileServices.getAllTutors({
            categoryId: categoryId as string,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });

        res.json({
            success: true,
            data: tutors
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




export const tutorProfileController = {
    createTutorProfile,
    getMyTUtorProfile,
    updateTutorProfile,
    getAllTutors,
}