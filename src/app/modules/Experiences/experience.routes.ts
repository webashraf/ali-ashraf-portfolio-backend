import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { experienceController } from "./experience.controller";
import { projectValidations } from "./experience.validation";

const router = Router();

router.post(
  "/create-experience",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.projectValidationSchema),
  experienceController.createExperience
);
router.put(
  "/update-experience/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.updateProjectValidationSchema),
  experienceController.updateExperience
);
router.delete("/:id", experienceController.deleteExperience);
router.put("/status/:id", experienceController.partialUpdateExperience);

router.get("/", experienceController.getExperience);
router.get("/my-experience/:id", experienceController.getExperience);

export const experienceRouters = router;
