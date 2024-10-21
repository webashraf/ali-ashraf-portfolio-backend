import { z } from "zod";

const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    user: z.string().min(1, { message: "User is required" }),
    rank: z.number().optional(),
    tags: z.string().min(1, { message: "Tags is required" }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    user: z.string().min(1, { message: "User is required" }),
    rank: z.string().optional(),
    tags: z.string().min(1, { message: "Tags is required" }),
  }),
});

export const projectValidations = {
  projectValidationSchema,
  updateProjectValidationSchema,
};
