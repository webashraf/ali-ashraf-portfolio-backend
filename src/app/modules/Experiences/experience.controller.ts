import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { projectService } from "./experience.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.createProjectIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Project is created successfully!",
    data: result,
  });
  
});
// experience
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.updateProjectIntoDB(
    req.params.id,
    req.body,
    image
  );
  res.status(200).json({
    success: true,
    message: "Project is updated successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.deleteProjectIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Project is deleted successfully!",
    data: result,
  });
});

const partialUpdateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.updateProjectPartialInfo(
    req.params.id,
    req.query
  );
  res.status(200).json({
    success: true,
    message: "Project status successfully updated!",
    data: result,
  });
});

const getProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getProjectFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Project successfully get!",
    data: result.projects,
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
