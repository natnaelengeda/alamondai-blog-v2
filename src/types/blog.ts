import { IBlogImage } from "./blogImage";
import { IUser } from "./user";


export interface IBlog {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image_url: IBlogImage | null
  tags: string[] | null
  is_published: boolean
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at: string
  user: IUser
  likes: ILike[]
  comments: IComment[]
  shares: any[]
  shareCount: number;
}

export interface ILike {
  id: number
  likerId: number
  createdAt: string
}

export interface IComment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
}