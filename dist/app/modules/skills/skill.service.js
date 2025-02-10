"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const skill_modal_1 = require("./skill.modal");
const createSkillIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const SkillData = Object.assign(Object.assign({}, payload), { imageUrl: image, createdAt: new Date(), updatedAt: new Date() });
    // const isUserExist = await User.isUserExistById(payload.user as any);
    // if (!isUserExist) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
    // }
    const res = yield skill_modal_1.Skill.create(SkillData);
    return res;
});
const updateSkillIntoDB = (rId, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    // const isUserExist = await User.isUserExistById(payload.user as any);
    // if (!isUserExist) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist!!");
    // }
    const SkillData = Object.assign(Object.assign(Object.assign({}, payload), (image && { imageUrl: image })), { updatedAt: new Date() });
    // Find and update the Skill
    const updatedSkill = yield skill_modal_1.Skill.findByIdAndUpdate(rId, SkillData, {
        new: true,
        runValidators: true,
    });
    if (!updatedSkill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Skill not found");
    }
    return updatedSkill;
});
const deleteSkillIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield skill_modal_1.Skill.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, upsert: true });
    return res;
});
const updateSkillPartialInfo = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const isSkillExist = yield skill_modal_1.Skill.findById(id);
    if (!isSkillExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Skill not found!!");
    }
    const res = yield skill_modal_1.Skill.findByIdAndUpdate(id, query, {
        new: true,
        runValidators: true,
        upsert: true,
    });
    return res;
});
const getSkillFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    // search
    let searchTerm = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = skill_modal_1.Skill.find({
        $or: ["title", "technologies"].map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    const allSkill = yield skill_modal_1.Skill.find();
    // Filter query
    const filterQuery = searchQuery.find(filterQueryItems);
    // sort
    let sort = "rank";
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 0;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query.limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = Number(query === null || query === void 0 ? void 0 : query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    let fields = "-__v";
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = query.fields.split(",").join(" ");
    }
    const filedLimitQuery = yield limitQuery.select(fields);
    return { Skills: filedLimitQuery, dataLength: allSkill === null || allSkill === void 0 ? void 0 : allSkill.length };
});
exports.skillService = {
    getSkillFromDB,
    updateSkillIntoDB,
    createSkillIntoDB,
    deleteSkillIntoDB,
    updateSkillPartialInfo,
};
