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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield blog_service_1.projectService.createBlogIntoDB(req.body, image);
    res.status(200).json({
        success: true,
        message: "Blog is created successfully!",
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield blog_service_1.projectService.updateBlogIntoDB(req.params.id, req.body, image);
    res.status(200).json({
        success: true,
        message: "Blog is updated successfully!",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.projectService.deleteBlogIntoDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog is deleted successfully!",
        data: result,
    });
}));
const partialUpdateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.projectService.updateBlogPartialInfo(req.params.id, req.query);
    res.status(200).json({
        success: true,
        message: "Blog status successfully updated!",
        data: result,
    });
}));
const getBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.projectService.getBlogFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Blog successfully get!",
        data: result.blogs,
        dataLength: result.dataLength,
    });
}));
exports.blogController = {
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    partialUpdateBlog,
};
