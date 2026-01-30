import { Request, Response } from "express";
import { bookingServices } from "./booking.services";
import { date, success } from "better-auth";

const createBooking = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const { tutorId, categoryId, date, timeSlot } = req.body;

    // Validation
    if (!tutorId || !categoryId || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const booking = await bookingServices.createBooking({
      studentId,
      tutorId,
      categoryId,
      date: new Date(date),
      timeSlot,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error("Booking error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Booking failed",
    });
  }
};


const getStudentBookings = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const bookings = await bookingServices.getBookingsByStudent(studentId);
    res.json({success: true, data: bookings})
  } catch (error: any) {
    res.status(500).json({success: false, message: error.message})
  }
}


const getTutorBookings = async (req: Request, res: Response) => {
  try {
    const tutorId = req.user!.id;
    const bookings = await bookingServices.getBookingsByTutor(tutorId)
    res.json({success: true, date: bookings})
  } catch (error: any) {
    res.status(500).json({success: false, message: error.message})
  }
}

// const updateBookingsStatus = async (req: Request, res: Response) => {
//   try {
//     const bookingId = req.params.id;
//     const {status} = req.body;
//     const userId = req.user!.id;

//     const updateBooking = bookingServices.u
//   } catch (error) {
    
//   }
// }

export const bookingController = {
  createBooking,
  getStudentBookings,
  getTutorBookings
};
