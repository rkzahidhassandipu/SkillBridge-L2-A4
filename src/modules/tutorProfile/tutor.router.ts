import { Router } from "express";
import { tutorProfileController } from "./tutor.controller";
import auth, { TutorRole } from "../../middlewares/auth";

const router = Router();

router.post("/", auth(TutorRole.TUTOR), tutorProfileController.createTutorProfile)
router.get("/", auth(TutorRole.TUTOR), tutorProfileController.getMyTUtorProfile)
router.put("/", auth(TutorRole.TUTOR), tutorProfileController.updateTutorProfile)


export const tutorProfileRouter: Router = router

// export const categoryRouter: Router = router