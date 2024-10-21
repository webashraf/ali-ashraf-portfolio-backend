import { ObjectId } from "mongoose";

export interface IBlog {
  title: string;
  user: ObjectId;
  imageUrl: string;
  rank: number;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isDeleted: boolean;
}
