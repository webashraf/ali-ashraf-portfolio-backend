"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillValidations = void 0;
const zod_1 = require("zod");
const skillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({ message: "Title is required" }),
        description: zod_1.z.string().nonempty({ message: "Description is required" }),
        color: zod_1.z.string().optional(),
        rank: zod_1.z.number().optional(),
        totalProjects: zod_1.z.number().optional(),
        level: zod_1.z.enum([
            "expertise",
            "comfortable",
            "familiar",
            "tools",
            "interpersonal",
        ]),
    }),
});
const updateSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        rank: zod_1.z.number().optional(),
        totalProjects: zod_1.z.number().optional(),
        level: zod_1.z.enum([
            "expertise",
            "comfortable",
            "familiar",
            "tools",
            "interpersonal",
        ]),
    }),
});
exports.skillValidations = {
    skillValidationSchema,
    updateSkillValidationSchema,
};
