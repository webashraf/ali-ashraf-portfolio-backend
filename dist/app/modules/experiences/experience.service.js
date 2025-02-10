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
exports.experienceService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const experience_modal_1 = require("./experience.modal");
const createExperienceIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const ExperienceData = Object.assign(Object.assign({}, payload), { companyLogoUrl: image, createdAt: new Date(), updatedAt: new Date() });
    const res = yield experience_modal_1.Experience.create(ExperienceData);
    return res;
});
const updateExperienceIntoDB = (rId, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const ExperienceData = Object.assign(Object.assign(Object.assign({}, payload), (image && { imageUrl: image })), { updatedAt: new Date() });
    // Find and update the Experience
    const updatedExperience = yield experience_modal_1.Experience.findByIdAndUpdate(rId, ExperienceData, {
        new: true,
        runValidators: true,
    });
    if (!updatedExperience) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Experience not found");
    }
    return updatedExperience;
});
const deleteExperienceIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield experience_modal_1.Experience.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, upsert: true });
    return res;
});
const updateExperiencePartialInfo = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const isExperienceExist = yield experience_modal_1.Experience.findById(id);
    if (!isExperienceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Experience not found!!");
    }
    const res = yield experience_modal_1.Experience.findByIdAndUpdate(id, query, {
        new: true,
        runValidators: true,
        upsert: true,
    });
    return res;
});
const getExperienceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    // search
    let searchTerm = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = experience_modal_1.Experience.find({
        $or: ["jobTitle", "location"].map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    const allExperience = yield experience_modal_1.Experience.find();
    // Filter query
    const filterQuery = searchQuery.find(filterQueryItems);
    // sort
    let sort = "-rank";
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
    return { Experiences: filedLimitQuery, dataLength: allExperience === null || allExperience === void 0 ? void 0 : allExperience.length };
});
exports.experienceService = {
    getExperienceFromDB,
    updateExperienceIntoDB,
    createExperienceIntoDB,
    deleteExperienceIntoDB,
    updateExperiencePartialInfo,
};
