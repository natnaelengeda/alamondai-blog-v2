"use client";
import React, { useState } from 'react'


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

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['latest-blogs'],
    queryFn: fetchLatestBlogs
  })

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start gap-5">
      <div
        className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {
          isError ? (
            <div className="col-span-full text-center text-red-500 font-bold text-lg py-4">There is an error loading the latest blogs.</div>
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


