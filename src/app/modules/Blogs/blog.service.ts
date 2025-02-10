/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.modal";

const createBlogIntoDB = async (payload: IBlog, image: any) => {
  const BlogData = {
    ...payload,
    imageUrl: image,
  };
  console.log("Payload", payload);

  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const res = await Blog.create(BlogData);
  return res;
};

const updateBlogIntoDB = async (
  rId: string,
  payload: Partial<IBlog>,
  image?: any
) => {
  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const BlogData = {
    ...payload,
    ...(image && { imageUrl: image }),
    updatedAt: new Date(),
  };

  // Find and update the Blog
  const updatedBlog = await Blog.findByIdAndUpdate(rId, BlogData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return updatedBlog;
};

const deleteBlogIntoDB = async (id: string) => {
  const res = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const updateBlogPartialInfo = async (id: string, query: any) => {
  const isBlogExist: any = await Blog.findById(id);

  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!!");
  }

  const res = await Blog.findByIdAndUpdate(id, query, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return res;
};

const getBlogFromDB = async (query: Record<string, unknown>) => {
  const filterQueryItems: any = {
    ...query,
  };
  const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
  removableFields.forEach((field) => delete filterQueryItems[field]);

  // search
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const searchQuery = Blog.find({
    $or: ["title", "technologies"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const allBlog = await Blog.find();

  // Filter query
  const filterQuery = searchQuery.find(filterQueryItems);

  // sort
  let sort = "-rank";
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 0;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query.limit) as number;
  }
  if (query?.page) {
    page = Number(query?.page) as number;
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query?.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }
  const filedLimitQuery = await limitQuery.select(fields);

  return { blogs: filedLimitQuery, dataLength: allBlog?.length };
};

export const projectService = {
  getBlogFromDB,
  updateBlogIntoDB,
  createBlogIntoDB,
  deleteBlogIntoDB,
  updateBlogPartialInfo,
};
