import { Router } from "express";
import auth, { TutorRole } from "../../middlewares/auth";
import { availabilityController } from "./availability.controller";


const router = Router();

router.put("/", auth(TutorRole.TUTOR), availabilityController.updateTutorAvailability)

export const availabilityRouter: Router = router;
// export const categoryRouter: Router = router