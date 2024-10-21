import { ObjectId } from "mongoose";

export interface ISkill {
  title: string;
  description: string;
  frontendCode: string;
  user: ObjectId;
  backendCode: string;
  liveLink: string;
  imageUrl: string;
  color: string;
  rank: number;
  features: string[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isDeleted: boolean;
}
