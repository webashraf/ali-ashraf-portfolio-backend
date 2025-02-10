"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceValidations = void 0;
const zod_1 = require("zod");
const experienceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobTitle: zod_1.z.string().min(1, { message: "Job title is required" }),
        companyName: zod_1.z.string().min(1, { message: "Company name is required" }),
        companyLogoUrl: zod_1.z.string().url().optional().nullable(),
        location: zod_1.z.string().optional().nullable(),
        startDate: zod_1.z.string().min(1, { message: "Start date is required" }),
        endDate: zod_1.z.string().optional().nullable(),
        responsibilities: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one responsibility is required" }),
        skills: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one skill is required" }),
        description: zod_1.z.string().optional().nullable(),
        websiteUrl: zod_1.z.string().url().optional().nullable(),
        rank: zod_1.z
            .number()
            .int()
            .min(0, { message: "Rank must be a non-negative integer" }),
    }),
});
const updateExperienceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobTitle: zod_1.z.string().optional(),
        companyName: zod_1.z.string().optional(),
        companyLogoUrl: zod_1.z.string().url().optional(),
        location: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        responsibilities: zod_1.z.array(zod_1.z.string()).optional(),
        skills: zod_1.z.array(zod_1.z.string()).optional(),
        description: zod_1.z.string().optional(),
        websiteUrl: zod_1.z.string().url().optional(),
        rank: zod_1.z.number().int().optional(),
    }),
});
exports.experienceValidations = {
    experienceValidationSchema,
    updateExperienceValidationSchema,
};
