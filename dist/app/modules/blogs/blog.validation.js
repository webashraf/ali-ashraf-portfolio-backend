"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidations = void 0;
const zod_1 = require("zod");
const projectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({ message: "Title is required" }),
        description: zod_1.z.string().nonempty({ message: "Description is required" }),
        rank: zod_1.z.number().optional(),
        tags: zod_1.z.array(zod_1.z.string()),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        rank: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.projectValidations = {
    projectValidationSchema,
    updateProjectValidationSchema,
};
