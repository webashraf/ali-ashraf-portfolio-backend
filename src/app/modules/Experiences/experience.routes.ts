import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { projectController } from "./experience.controller";
import { projectValidations } from "./experience.validation";

const router = Router();

router.post(
  "/create-project",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.projectValidationSchema),
  projectController.createProject
);
router.put(
  "/update-project/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.updateProjectValidationSchema),
  projectController.updateProject
);
router.delete("/:id", projectController.deleteProject);
router.put("/status/:id", projectController.partialUpdateProject);

router.get("/", projectController.getProject);
router.get("/my-project/:id", projectController.getProject);

export const projectRouters = router;
