import { getBlogForUser } from '@/api/blog';
import BlogCard from '@/components/blog-card';
import LoadingBlogs from '@/components/loading-blogs';
import { UserState } from '@/state/user'
import { IBlog } from '@/types/blog';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Posts() {
  const user = useSelector((state: { user: UserState }) => state.user);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user-blog'],
    queryFn: getBlogForUser,
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes fresh
    refetchOnWindowFocus: false, // 👌 prevent refetch when tab refocus
  });


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
        className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {
          isError ? (
            <div className="py-4 text-lg font-bold text-center text-red-500 col-span-full">There is an error loading the latest blogs.</div>
          ) : (
            !isPending &&
            data &&
            data.map((blog: IBlog, index: number) => {
              return (<BlogCard key={index} blog={blog} />)
            })
          )
        }
        <LoadingBlogs
          loading={isPending} />
      </div>


    </div>
  )
}
