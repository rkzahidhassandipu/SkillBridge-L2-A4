import { prisma } from "../../lib/prisma";

interface Slot {
  day: string;
  startTime: string;
  endTime: string;
}

const updateAvailability = async (tutorProfileId: string, slots: Slot[]) => {
  const existingSlots = await prisma.tutorAvailability.findMany({
    where: { tutorProfileId },
  });

  const newSlots = slots.filter(
    (slot) =>
      !existingSlots.some(
        (e) =>
          e.day === slot.day &&
          e.startTime === slot.startTime &&
          e.endTime === slot.endTime,
      ),
  );

  if(!newSlots.length){
    return {message: "No new slots to add"}
  }

  return await prisma.tutorAvailability.createMany({
    data: newSlots.map((slot) => ({
        tutorProfileId,
        day: slot.day,
        startTime: slot.startTime,
        endTime: slot.endTime
    }))
  })
};


export const availabilityServices = {
    updateAvailability
}