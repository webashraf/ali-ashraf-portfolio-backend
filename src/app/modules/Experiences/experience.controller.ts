import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { experienceService } from "./experience.service";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await experienceService.createExperienceIntoDB(
    req.body,
    image
  );
  res.status(200).json({
    success: true,
    message: "Experience is created successfully!",
    data: result,
  });
});
// experience
const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await experienceService.updateExperienceIntoDB(
    req.params.id,
    req.body,
    image
  );
  res.status(200).json({
    success: true,
    message: "Experience is updated successfully!",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.deleteExperienceIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Experience is deleted successfully!",
    data: result,
  });
});

const partialUpdateExperience = catchAsync(
  async (req: Request, res: Response) => {
    const result = await experienceService.updateExperiencePartialInfo(
      req.params.id,
      req.query
    );
    res.status(200).json({
      success: true,
      message: "Experience status successfully updated!",
      data: result,
    });
  }
);

const getExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.getExperienceFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Experience successfully get!",
    data: result.Experiences,
    dataLength: result.dataLength,
  });
});

export const experienceController = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  partialUpdateExperience,
};
