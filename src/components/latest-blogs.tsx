"use client";
import React, { useState } from 'react'


// Components
import { Text } from "@mantine/core"
import LoadingBlogs from './loading-blogs';
import BlogCard, { IBlogCard } from './blog-card';

// React Query
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from "@/utils/axios";


export default function LatestBlogs() {
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestBlogs = async () => {
    try {
      const result = await axios.get("/blog");
      const status = result.status;

      if (status == 200) {
        return result.data;
      }

    } catch (error) {

    }
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['latest-blogs'],
    queryFn: fetchLatestBlogs
  })


  console.log(data);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start gap-5">
      <Text size="lg">Latest</Text>
      <div
        className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {
          !isPending &&
          data&&
          data.map((blog: IBlogCard, index: number) => {
            return (<BlogCard key={index} blog={blog} />)
          })
        }
        <LoadingBlogs loading={isPending} />
      </div>
    </div>
  )
}


