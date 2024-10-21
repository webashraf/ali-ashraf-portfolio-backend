import { ObjectId } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  src: string;
  frontendCode: string;
  user: ObjectId;
  backendCode: string;
  liveLink: string;
  color: string;
  features: string[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isDeleted: boolean;
}
