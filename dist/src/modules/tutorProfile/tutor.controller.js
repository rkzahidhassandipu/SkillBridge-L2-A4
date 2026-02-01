import { tutorProfileServices } from "./tutor.services";
const createTutorProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio, pricePerHour, categoryIds } = req.body;
        const profile = await tutorProfileServices.createTutorProfile(userId, bio, pricePerHour, categoryIds);
        res.status(201).json({
            success: true,
            profile
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getMyTUtorProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await tutorProfileServices.getTutorProfileByUserId(userId);
        res.json({
            success: true,
            profile
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
const updateTutorProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio, pricePerHour, categoryIds } = req.body;
        const profile = await tutorProfileServices.updateTutorProfile(userId, bio, pricePerHour, categoryIds);
        res.json({
            success: true,
            profile
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getAllTutors = async (req, res) => {
    try {
        const { categoryId, minPrice, maxPrice } = req.query;
        const tutors = await tutorProfileServices.getAllTutors({
            categoryId: categoryId,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        });
        res.json({
            success: true,
            data: tutors
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getTutorById = async (req, res) => {
    try {
        const tutorProfileId = req.params.tutorProfileId;
        const tutor = await tutorProfileServices.getTutorById(tutorProfileId);
        res.json({
            success: true,
            data: tutor
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
export const tutorProfileController = {
    createTutorProfile,
    getMyTUtorProfile,
    updateTutorProfile,
    getAllTutors,
    getTutorById
};
//# sourceMappingURL=tutor.controller.js.map