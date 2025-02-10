"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const experienceSchema = new mongoose_1.default.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLogoUrl: { type: String, default: null },
    location: { type: String, default: null },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    responsibilities: { type: [String], required: true },
    skills: { type: [String], required: true },
    description: { type: String, default: null },
    websiteUrl: { type: String, default: null },
    rank: { type: Number, required: true },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Experience = mongoose_1.default.model("Experience", experienceSchema);
