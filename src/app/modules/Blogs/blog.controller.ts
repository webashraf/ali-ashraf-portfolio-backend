import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { projectService } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.createBlogIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Recipe is created successfully!",
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;
  const result = await projectService.updateBlogIntoDB(
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

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.deleteBlogIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Recipe is deleted successfully!",
    data: result,
  });
});

const partialUpdateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.updateBlogPartialInfo(
    req.params.id,
    req.query
  );
  res.status(200).json({
    success: true,
    message: "Recipe status successfully updated!",
    data: result,
  });
});

const getBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getBlogFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Recipe successfully get!",
    data: result.recipes,
    dataLength: result.dataLength,
  });
});

export const blogController = {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  partialUpdateBlog,
};
