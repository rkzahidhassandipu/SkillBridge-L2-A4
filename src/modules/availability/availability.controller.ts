import { success } from "better-auth";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { availabilityServices } from "./availability.services";

const updateTutorAvailability = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        
        if(!userId){
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const {slots} = req.body as {slots?: {day: string, startTime: string, endTime: string}[]}
        if(!slots?.length){
            return res.status(400).json({success: false, message: "Not slots provided"})
        }
        const profile = await prisma.tutorProfile.findUnique({where: {userId}});

        if(!profile){
            return res.status(404).json({success: false, message: "Tutor profile not found"})
        }

        await availabilityServices.updateAvailability(profile.id, slots)
        res.status(200).json({success: true, message: "Availability updated"})
    } catch (error: any) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}


export const availabilityController = {
  updateTutorAvailability,
};
