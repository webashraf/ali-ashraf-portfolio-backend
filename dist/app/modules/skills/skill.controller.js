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
exports.skillController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const skill_service_1 = require("./skill.service");
const createSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield skill_service_1.skillService.createSkillIntoDB(req.body, image);
    res.status(200).json({
        success: true,
        message: "Skill is created successfully!",
        data: result,
    });
}));
const updateSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield skill_service_1.skillService.updateSkillIntoDB(req.params.id, req.body, image);
    res.status(200).json({
        success: true,
        message: "Skill is updated successfully!",
        data: result,
    });
}));
const deleteSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_service_1.skillService.deleteSkillIntoDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Skill is deleted successfully!",
        data: result,
    });
}));
const partialUpdateSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_service_1.skillService.updateSkillPartialInfo(req.params.id, req.query);
    res.status(200).json({
        success: true,
        message: "Skill status successfully updated!",
        data: result,
    });
}));
const getSkill = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_service_1.skillService.getSkillFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Skill successfully get!",
        data: result.Skills,
        dataLength: result.dataLength,
    });
}));
exports.skillController = {
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
    partialUpdateSkill,
};
