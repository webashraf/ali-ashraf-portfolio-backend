import { z } from "zod";

const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    user: z.string().min(1, { message: "User is required" }),
    src: z.string().nonempty({ message: "Source is required" }),
    frontendCode: z
      .string()
      .url({ message: "Frontend code must be a valid URL" }),
    backendCode: z
      .string()
      .url({ message: "Backend code must be a valid URL" }),
    liveLink: z.string().url({ message: "Live link must be a valid URL" }),
    color: z.string().optional(),
    features: z
      .array(z.string())
      .nonempty({ message: "At least one feature is required" }),
    technologies: z
      .array(z.string())
      .nonempty({ message: "At least one technology is required" }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    user: z.string().min(1, { message: "User is required" }),
    src: z.string().optional(),
    frontendCode: z
      .string()
      .url({ message: "Frontend code must be a valid URL" })
      .optional(),
    backendCode: z
      .string()
      .url({ message: "Backend code must be a valid URL" })
      .optional(),
    liveLink: z
      .string()
      .url({ message: "Live link must be a valid URL" })
      .optional(),
    color: z.string().optional(),
    features: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
  }),
});

export const projectValidations = {
  projectValidationSchema,
  updateProjectValidationSchema,
};
