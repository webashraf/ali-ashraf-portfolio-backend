import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { skillService } from "./skill.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await skillService.createSkillIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Skill is created successfully!",
    data: result,
  });
});
const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await skillService.updateSkillIntoDB(
    req.params.id,
    req.body,
    image
  );
  res.status(200).json({
    success: true,
    message: "Skill is updated successfully!",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.deleteSkillIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Skill is deleted successfully!",
    data: result,
  });
});

const partialUpdateSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.updateSkillPartialInfo(
    req.params.id,
    req.query
  );
  res.status(200).json({
    success: true,
    message: "Skill status successfully updated!",
    data: result,
  });
});

const getSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.getSkillFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Skill successfully get!",
    data: result.Skills,
    dataLength: result.dataLength,
  });
});

export const skillController = {
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  partialUpdateSkill,
};
