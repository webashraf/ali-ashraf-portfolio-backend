import mongoose from "mongoose";
import { IExperience } from "./experience.interface";

const experienceSchema = new mongoose.Schema<IExperience>(
  {
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
  },
  { timestamps: true }
);

export const Experience = mongoose.model<IExperience>(
  "Experience",
  experienceSchema
);
