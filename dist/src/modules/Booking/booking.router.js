import { Router } from "express";
import auth, { TutorRole } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";
const router = Router();
router.post("/", auth(TutorRole.USER), bookingController.createBooking);
// Student dashboard
router.get("/", auth(TutorRole.USER), bookingController.getStudentBookings);
// Tutor dashboard
router.get("/tutor", auth(TutorRole.TUTOR), bookingController.getTutorBookings);
router.patch("/:id", auth(TutorRole.USER, TutorRole.TUTOR), bookingController.updateBookingStatus);
export const bookingRouter = router;
// export const categoryRouter: Router = router
//# sourceMappingURL=booking.router.js.map