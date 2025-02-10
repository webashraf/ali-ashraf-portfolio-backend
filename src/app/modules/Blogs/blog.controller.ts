import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { projectService } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const image = req?.file?.path;

  console.log("Request body", req.body);
  const result = await projectService.createBlogIntoDB(req.body, image);
  res.status(200).json({
    success: true,
    message: "Blog is created successfully!",
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
    message: "Blog is updated successfully!",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.deleteBlogIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    message: "Blog is deleted successfully!",
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
    message: "Blog status successfully updated!",
    data: result,
  });
});

const getBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await projectService.getBlogFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "Blog successfully get!",
    data: result.blogs,
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
