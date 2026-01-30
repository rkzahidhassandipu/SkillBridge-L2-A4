import { prisma } from "../../lib/prisma";


interface CreateBookingInput {
  studentId: string;   
  tutorId: string;     
  categoryId: string;  
  date: Date;          
  timeSlot: string;    
}

const createBooking = async (data: CreateBookingInput) => {
  // 1️⃣ Prevent double booking
  const exists = await prisma.booking.findFirst({
    where: {
      tutorId: data.tutorId,
      date: data.date,
      timeSlot: data.timeSlot,
      status: "CONFIRMED",
    },
  });

  if (exists) {
    throw new Error("This slot is already booked for the tutor");
  }

  // 2️⃣ Prevent student booking themselves (if tutorId === studentId)
  if (data.tutorId === data.studentId) {
    throw new Error("You cannot book your own session");
  }

  // 3️⃣ Create booking
  const booking = await prisma.booking.create({
    data: {
      student: { connect: { id: data.studentId } },
      tutor: { connect: { id: data.tutorId } },
      category: { connect: { id: data.categoryId } },
      date: data.date,
      timeSlot: data.timeSlot,
      status: "CONFIRMED",
    },
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: { select: { id: true, name: true, email: true } },
      category: true,
    },
  });

  return booking;
};



const getBookingsByStudent = async (studentId: string) => {
  return prisma.booking.findMany({
    where: {studentId},
    include: {
      tutor: {select: {id: true, name: true, email: true}},
      category: true
    },
    orderBy: {date: "asc"}
  })
}


const getBookingsByTutor = async (tutorId: string) => {
  return prisma.booking.findMany({
    where: {tutorId},
    include: {
      student: {select: {id: true, name: true, email: true}},
      category: true
    },
    orderBy: {date: "asc"}
  })
}
export const bookingServices = {
  createBooking,
  getBookingsByStudent,
  getBookingsByTutor
};
