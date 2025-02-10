import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middleware/auth";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../users/user.const";
import { blogController } from "./blog.controller";
import { projectValidations } from "./blog.validation";

const router = Router();

router.post(
  "/create-blog",
  auth(USER_ROLE.admin),
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.projectValidationSchema),
  blogController.createBlog
);
router.put(
  "/update-blog/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(projectValidations.updateProjectValidationSchema),
  blogController.updateBlog
);
router.delete("/:id", blogController.deleteBlog);
router.put("/status/:id", blogController.partialUpdateBlog);

router.get("/", blogController.getBlog);
router.get("/my-blog/:id", blogController.getBlog);

export const blogRouters = router;
