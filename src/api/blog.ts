
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

// Types
import { IBlog } from "@/types/blog";
import { limit } from "firebase/firestore";

interface ILatestBlog {
  blogs: IBlog[];
  pages: string;
  totalCount: number;
  nextPage: string | number | null;
}
const logError = async (page: string, type: string, api: string, error: any) => {
  try {
    await axios.post("/errors", { page, type, api, error: error.message });
  } catch (e) {
    console.error("Failed to log error:", e);
  }
};

export const fetchLatestBlogs = async (limit: number, offset: number): Promise<ILatestBlog> => {
  const response = await axios.get(`/blog?limit=${limit}&offset=${offset}`);
  return response.data;
}

export const useAllBlog = (limit: number, offset: number) => {
  return useQuery({
    queryKey: [`latest-blogs-${limit}-${offset}`],
    queryFn: () => fetchLatestBlogs(limit, offset),
    enabled: true,
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes fresh
    refetchOnWindowFocus: false, // 👌 prevent refetch when tab refocuses
  });
}

export const fetchFeaturedBlog = async () => {
  try {
    const result = await axios.get('/blog/featured');
    const status = result.status;

    if (status == 200) {
      return result.data;
    }
  } catch (error: any) {
    logError("blog", "api", "fetchFeaturedBlog", error);
    return null;
  }
}
export const fetchBlogBySlug = async (slug: string): Promise<IBlog> => {
  const response = await axios.get(`/blog/get-by-slug/${slug}`);
  return response.data;
};


export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes fresh
    // cacheTime: 30 * 60 * 1000, // ✅ 30 minutes in cache after unmount
    refetchOnWindowFocus: false, // 👌 prevent refetch when tab refocuses
    // keepPreviousData: true, // 🔁 smooth UI when changing slugs
  });
};

export const emailSubscription = async (email: string) => {
  const response = await axios.post('/blog/subscribe-newsletter', { email });
  return response;
}

export const getBlogForUser = async () => {
  const response = await axios.get('/blog/get-user-blog');
  return response.data;
}

export const deleteBlogById = async ({ id }: { id: number }) => {
  const response = await axios.delete(`/blog/${id}`);
  return response;
}

export async function getBlogBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/get-by-slug/${slug}`)
  if (!res.ok) throw new Error("Failed to fetch blog")
  return res.json()
}