import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { skillController } from "./skill.controller";
import { skillValidations } from "./skill.validation";

const router = Router();

router.post(
  "/create-skill",
  multerUpload.single("image"),
  parseBody,
  validateRequest(skillValidations.skillValidationSchema),
  skillController.createSkill
);
router.put(
  "/update-skill/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(skillValidations.updateSkillValidationSchema),
  skillController.updateSkill
);
router.delete("/:id", skillController.deleteSkill);
router.put("/status/:id", skillController.partialUpdateSkill);

router.get("/", skillController.getSkill);
router.get("/my-skill/:id", skillController.getSkill);

export const skillRouters = router;
