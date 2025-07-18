import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

// Types
import { IBlog } from "@/types/blog";

export const fetchLatestBlogs = async () => {
  try {
    const result = await axios.get("/blog");
    const status = result.status;

    if (status == 200) {
      return result.data;
    }

  } catch (error) {
    return null;
  }
}

export const fetchFeaturedBlog = async () => {
  try {
    const result = await axios.get('/blog/featured');
    const status = result.status;

    if (status == 200) {
      return result.data;
    }
  } catch (error) {
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