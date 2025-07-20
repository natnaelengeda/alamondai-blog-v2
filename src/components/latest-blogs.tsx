"use client";
import React from 'react'

// Components
import LoadingBlogs from './loading-blogs';
import BlogCard from './blog-card';

// React Query
import { useQuery } from '@tanstack/react-query';

// api
import { fetchLatestBlogs } from '@/api/blog';

// Types
import { IBlog } from '@/types/blog';


export default function LatestBlogs() {

  const { isPending, isError, data } = useQuery({
    queryKey: ['latest-blogs'],
    queryFn: fetchLatestBlogs
  })

  return (
    <div className="flex flex-col items-center justify-start w-full h-auto gap-5">
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
        <LoadingBlogs loading={isPending} />
      </div>
    </div>
  )
}


