import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { projectService } from "./project.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.createRecipeIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Recipe is created successfully!",
    data: result,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.updateRecipeIntoDB(
    req.params.id,
    req.body,
    image
  );
  res.status(200).json({
    success: true,
    message: "Recipe is updated successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.deleteRecipeIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Recipe is deleted successfully!",
    data: result,
  });
});

const partialUpdateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.updateRecipePertialInfo(
    req.params.id,
    req.query
  );
  res.status(200).json({
    success: true,
    message: "Recipe status successfully updated!",
    data: result,
  });
});

const getProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getRecipeFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Recipe successfully get!",
    data: result.recipes,
    dataLength: result.dataLength,
  });
});

export const projectController = {
  getProject,
  createProject,
  updateProject,
  deleteProject,
  partialUpdateProject,
};
