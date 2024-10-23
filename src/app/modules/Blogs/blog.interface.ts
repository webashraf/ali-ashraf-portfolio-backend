export interface IBlog {
  title: string;
  imageUrl: string;
  rank: number;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isDeleted: boolean;
}
