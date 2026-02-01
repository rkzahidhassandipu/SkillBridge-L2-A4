import { prisma } from "../../lib/prisma";
const updateAvailability = async (tutorProfileId, slots) => {
    const existingSlots = await prisma.tutorAvailability.findMany({
        where: { tutorProfileId },
    });
    const newSlots = slots.filter((slot) => !existingSlots.some((e) => e.day === slot.day &&
        e.startTime === slot.startTime &&
        e.endTime === slot.endTime));
    if (!newSlots.length) {
        return { message: "No new slots to add" };
    }
    return await prisma.tutorAvailability.createMany({
        data: newSlots.map((slot) => ({
            tutorProfileId,
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime
        }))
    });
};
export const availabilityServices = {
    updateAvailability
};
//# sourceMappingURL=availability.services.js.map