export interface IExperience {
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  responsibilities: string[];
  skills: string[];
  description?: string;
  websiteUrl?: string;
  rank: number;
  createdAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  isDeleted?: boolean;
}
