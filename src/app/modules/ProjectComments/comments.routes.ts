import { Router } from "express";
import { userOpinionsController } from "./comments.controller";

const router = Router();

router.post("/create", userOpinionsController.createRecipeUserOpinion);
router.get("/:postId", userOpinionsController.getComments);

export const userOpinionRoutes = router;
