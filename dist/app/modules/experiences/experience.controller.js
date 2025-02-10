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
exports.experienceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const experience_service_1 = require("./experience.service");
const createExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield experience_service_1.experienceService.createExperienceIntoDB(req.body, image);
    res.status(200).json({
        success: true,
        message: "Experience is created successfully!",
        data: result,
    });
}));
// experience
const updateExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield experience_service_1.experienceService.updateExperienceIntoDB(req.params.id, req.body, image);
    res.status(200).json({
        success: true,
        message: "Experience is updated successfully!",
        data: result,
    });
}));
const deleteExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_service_1.experienceService.deleteExperienceIntoDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Experience is deleted successfully!",
        data: result,
    });
}));
const partialUpdateExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_service_1.experienceService.updateExperiencePartialInfo(req.params.id, req.query);
    res.status(200).json({
        success: true,
        message: "Experience status successfully updated!",
        data: result,
    });
}));
const getExperience = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_service_1.experienceService.getExperienceFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Experience successfully get!",
        data: result.Experiences,
        dataLength: result.dataLength,
    });
}));
exports.experienceController = {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience,
    partialUpdateExperience,
};
