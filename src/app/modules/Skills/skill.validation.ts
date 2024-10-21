import { z } from "zod";

const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    color: z.string().optional(),
    rank: z.number().optional(),
    totalProjects: z.number().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    rank: z.number().optional(),
    totalProjects: z.number().optional(),
  }),
});

export const projectValidations = {
  projectValidationSchema,
  updateProjectValidationSchema,
};
