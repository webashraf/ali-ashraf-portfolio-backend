import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { skillController } from "./skill.controller";
import { projectValidations } from "./skill.validation";

const router = Router();

router.post(
  "/create-project",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.projectValidationSchema),
  skillController.createSkill
);
router.put(
  "/update-project/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.updateProjectValidationSchema),
  skillController.updateSkill
);
router.delete("/:id", skillController.deleteSkill);
router.put("/status/:id", skillController.partialUpdateSkill);

router.get("/", skillController.getSkill);
router.get("/my-project/:id", skillController.getSkill);

export const skillRouters = router;
