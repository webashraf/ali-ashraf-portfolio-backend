/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IExperience } from "./experience.interface";
import { Experience } from "./experience.modal";

const createExperienceIntoDB = async (payload: IExperience, image: any) => {
  const ExperienceData = {
    ...payload,
    companyLogoUrl: image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const res = await Experience.create(ExperienceData);
  return res;
};

const updateExperienceIntoDB = async (
  rId: string,
  payload: Partial<IExperience>,
  image?: any
) => {
  const ExperienceData = {
    ...payload,
    ...(image && { imageUrl: image }),
    updatedAt: new Date(),
  };

  // Find and update the Experience
  const updatedExperience = await Experience.findByIdAndUpdate(
    rId,
    ExperienceData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedExperience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  return updatedExperience;
};

const deleteExperienceIntoDB = async (id: string) => {
  const res = await Experience.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const updateExperiencePartialInfo = async (id: string, query: any) => {
  const isExperienceExist: any = await Experience.findById(id);

  if (!isExperienceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found!!");
  }

  const res = await Experience.findByIdAndUpdate(id, query, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return res;
};

const getExperienceFromDB = async (query: Record<string, unknown>) => {
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
  const searchQuery = Experience.find({
    $or: ["jobTitle", "location"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const allExperience = await Experience.find();

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

  return { Experiences: filedLimitQuery, dataLength: allExperience?.length };
};

export const experienceService = {
  getExperienceFromDB,
  updateExperienceIntoDB,
  createExperienceIntoDB,
  deleteExperienceIntoDB,
  updateExperiencePartialInfo,
};
