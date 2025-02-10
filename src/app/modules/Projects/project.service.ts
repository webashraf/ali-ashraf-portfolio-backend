/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { IProject } from "./project.interface";
import { Project } from "./project.modal";

const createProjectIntoDB = async (payload: IProject, image: any) => {
  const ProjectData = {
    ...payload,
    imageUrl: image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const res = await Project.create(ProjectData);
  return res;
};

const updateProjectIntoDB = async (
  rId: string,
  payload: Partial<IProject>,
  image?: any
) => {
  const isUserExist = await User.isUserExistById(payload.user as any);
  if (!isUserExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  }

  const ProjectData = {
    ...payload,
    ...(image && { imageUrl: image }),
    updatedAt: new Date(),
  };

  // Find and update the Project
  const updatedProject = await Project.findByIdAndUpdate(rId, ProjectData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return updatedProject;
};

const deleteProjectIntoDB = async (id: string) => {
  const res = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const updateProjectPartialInfo = async (id: string, query: any) => {
  const isProjectExist: any = await Project.findById(id);

  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found!!");
  }

  const res = await Project.findByIdAndUpdate(id, query, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return res;
};

const getProjectFromDB = async (query: Record<string, unknown>) => {
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
  const searchQuery = Project.find({
    $or: ["title", "technologies"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const allProject = await Project.find();

  // Filter query
  const filterQuery = searchQuery.find(filterQueryItems).populate("user");

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

  return { projects: filedLimitQuery, dataLength: allProject?.length };
};

export const projectService = {
  getProjectFromDB,
  updateProjectIntoDB,
  createProjectIntoDB,
  deleteProjectIntoDB,
  updateProjectPartialInfo,
};
