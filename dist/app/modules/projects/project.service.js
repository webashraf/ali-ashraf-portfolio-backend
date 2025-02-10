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
exports.projectService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../users/user.model");
const project_modal_1 = require("./project.modal");
const createProjectIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectData = Object.assign(Object.assign({}, payload), { imageUrl: image, createdAt: new Date(), updatedAt: new Date() });
    const isUserExist = yield user_model_1.User.isUserExistById(payload.user);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const res = yield project_modal_1.Project.create(ProjectData);
    return res;
});
const updateProjectIntoDB = (rId, payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(payload.user);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const ProjectData = Object.assign(Object.assign(Object.assign({}, payload), (image && { imageUrl: image })), { updatedAt: new Date() });
    // Find and update the Project
    const updatedProject = yield project_modal_1.Project.findByIdAndUpdate(rId, ProjectData, {
        new: true,
        runValidators: true,
    });
    if (!updatedProject) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Project not found");
    }
    return updatedProject;
});
const deleteProjectIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield project_modal_1.Project.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, upsert: true });
    return res;
});
const updateProjectPartialInfo = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const isProjectExist = yield project_modal_1.Project.findById(id);
    if (!isProjectExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Project not found!!");
    }
    const res = yield project_modal_1.Project.findByIdAndUpdate(id, query, {
        new: true,
        runValidators: true,
        upsert: true,
    });
    return res;
});
const getProjectFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    // search
    let searchTerm = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = project_modal_1.Project.find({
        $or: ["title", "technologies"].map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    const allProject = yield project_modal_1.Project.find();
    // Filter query
    const filterQuery = searchQuery.find(filterQueryItems).populate("user");
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
    return { projects: filedLimitQuery, dataLength: allProject === null || allProject === void 0 ? void 0 : allProject.length };
});
exports.projectService = {
    getProjectFromDB,
    updateProjectIntoDB,
    createProjectIntoDB,
    deleteProjectIntoDB,
    updateProjectPartialInfo,
};
