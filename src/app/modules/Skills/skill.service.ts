/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/appError";
import { ISkill } from "./skill.interface";
import { Skill } from "./skill.modal";

const createSkillIntoDB = async (payload: ISkill, image: any) => {
  const SkillData = {
    ...payload,
    imageUrl: image,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // const isUserExist = await User.isUserExistById(payload.user as any);
  // if (!isUserExist) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  // }

  const res = await Skill.create(SkillData);
  return res;
};

const updateSkillIntoDB = async (
  rId: string,
  payload: Partial<ISkill>,
  image?: any
) => {
  // const isUserExist = await User.isUserExistById(payload.user as any);
  // if (!isUserExist) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
  // }

  const SkillData = {
    ...payload,
    ...(image && { imageUrl: image }),
    updatedAt: new Date(),
  };

  // Find and update the Skill
  const updatedSkill = await Skill.findByIdAndUpdate(rId, SkillData, {
    new: true,
    runValidators: true,
  });

  if (!updatedSkill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }

  return updatedSkill;
};

const deleteSkillIntoDB = async (id: string) => {
  const res = await Skill.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true, upsert: true }
  );

  return res;
};

const updateSkillPartialInfo = async (id: string, query: any) => {
  const isSkillExist: any = await Skill.findById(id);

  if (!isSkillExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found!!");
  }

  const res = await Skill.findByIdAndUpdate(id, query, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return res;
};

const getSkillFromDB = async (query: Record<string, unknown>) => {
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
  const searchQuery = Skill.find({
    $or: ["title", "technologies"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const allSkill = await Skill.find();

  // Filter query
  const filterQuery = searchQuery.find(filterQueryItems);

  // sort
  let sort = "rank";
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

  return { Skills: filedLimitQuery, dataLength: allSkill?.length };
};

export const skillService = {
  getSkillFromDB,
  updateSkillIntoDB,
  createSkillIntoDB,
  deleteSkillIntoDB,
  updateSkillPartialInfo,
};
