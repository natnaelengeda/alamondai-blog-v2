import { IBlogImage } from "./blogImage";
import { IUser } from "./user";


export type IBlog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: IBlogImage | null;
  tags: string[] | null;
  is_published: boolean;
  published_at: string; // ISO date string
  user: IUser;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};