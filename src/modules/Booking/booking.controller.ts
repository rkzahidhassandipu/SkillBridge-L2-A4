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

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id as string;
    const { status } = req.body; // "CANCELLED" or "COMPLETED"
    const userId = req.user!.id;

    // Validate status
    if (!["CANCELLED", "COMPLETED"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedBooking = await bookingServices.updateBookingStatus(
      bookingId,
      status,
      userId
    );

    res.json({ success: true, data: updatedBooking });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const bookingController = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus
};
