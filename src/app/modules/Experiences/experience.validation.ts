import { z } from "zod";

const experienceValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string().min(1, { message: "Job title is required" }),
    companyName: z.string().min(1, { message: "Company name is required" }),
    companyLogoUrl: z.string().url().optional().nullable(),
    location: z.string().optional().nullable(),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().optional().nullable(),
    responsibilities: z
      .array(z.string())
      .nonempty({ message: "At least one responsibility is required" }),
    skills: z
      .array(z.string())
      .nonempty({ message: "At least one skill is required" }),
    description: z.string().optional().nullable(),
    websiteUrl: z.string().url().optional().nullable(),
    rank: z
      .number()
      .int()
      .min(0, { message: "Rank must be a non-negative integer" }),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string().optional(),
    companyName: z.string().optional(),
    companyLogoUrl: z.string().url().optional(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    description: z.string().optional(),
    websiteUrl: z.string().url().optional(),
    rank: z.number().int().optional(),
  }),
});

export const experienceValidations = {
  experienceValidationSchema,
  updateExperienceValidationSchema,
};
