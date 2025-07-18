import React from 'react'

// Compoennts
import BlogCard from '@/components/blog-card';
import LoadingBlogs from '@/components/loading-blogs';

// State
import { useSelector } from 'react-redux'
import { UserState } from '@/state/user'

// Api
import { useQuery } from '@tanstack/react-query'
import { getBlogForUser } from '@/api/blog';

// Types
import { IBlog } from '@/types/blog';


export default function Posts() {
  const user = useSelector((state: { user: UserState }) => state.user);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['current-user-blog'],
    queryFn: getBlogForUser,
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes fresh
    refetchOnWindowFocus: false, // 👌 prevent refetch when tab refocus
  });

  console.log(data);

  return (
    <div
      className="flex flex-col flex-1">
      {/* Title */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">My Posts</h1>
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div
        className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-5">
        {
          isError ? (
            <div className="py-4 text-lg font-bold text-center text-red-500 col-span-full">There is an error loading the latest blogs.</div>
          ) : (
            !isPending &&
            data &&
            data.blogs.length > 0 &&
            data.blogs.map((blog: IBlog, index: number) => {
              return (
                <BlogCard
                  key={index}
                  blog={blog}
                  owner={true} />)
            })
          )
        }
        <LoadingBlogs
          loading={isPending} />
      </div>


    </div>
  )
}
