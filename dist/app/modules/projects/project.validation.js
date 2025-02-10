"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidations = void 0;
const zod_1 = require("zod");
const projectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({ message: "Title is required" }),
        description: zod_1.z.string().nonempty({ message: "Description is required" }),
        user: zod_1.z.string().min(1, { message: "User is required" }),
        // src: z.string().nonempty({ message: "Source is required" }),
        frontendCode: zod_1.z
            .string()
            .url({ message: "Frontend code must be a valid URL" }),
        backendCode: zod_1.z
            .string()
            .url({ message: "Backend code must be a valid URL" }),
        color: zod_1.z.string().optional(),
        rank: zod_1.z.number().optional(),
        liveLink: zod_1.z.string().url({ message: "Backend code must be a valid URL" }),
        features: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one feature is required" }),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "At least one technology is required" }),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        user: zod_1.z.string().min(1, { message: "User is required" }),
        src: zod_1.z.string().optional(),
        frontendCode: zod_1.z
            .string()
            .url({ message: "Frontend code must be a valid URL" })
            .optional(),
        backendCode: zod_1.z
            .string()
            .url({ message: "Backend code must be a valid URL" })
            .optional(),
        liveLink: zod_1.z
            .string()
            .url({ message: "Live link must be a valid URL" })
            .optional(),
        color: zod_1.z.string().optional(),
        rank: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        technologies: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.projectValidations = {
    projectValidationSchema,
    updateProjectValidationSchema,
};
