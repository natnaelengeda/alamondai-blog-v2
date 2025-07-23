"use client";
import React, { useEffect, useState } from 'react'

// Components
import LoadingBlogs from './loading-blogs';
import BlogCard from './blog-card';

// api
import { useAllBlog } from '@/api/blog';

// Types
import { IBlog } from '@/types/blog';
import { Button } from '@mantine/core';


export default function LatestBlogs() {
  const [limit] = useState<number>(9);
  const [offSet, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { data, error, isPending } = useAllBlog(limit, offSet);

  useEffect(() => {
    if (data?.totalCount) {
      setTotal(data?.totalCount);
    }
  }, [data]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offSet / limit) + 1;

  const handlePageClick = (page: number) => {
    setOffset((page - 1) * limit);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    if (offSet + limit < total) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setOffset(offSet + limit);
    }
  };

  const handlePrev = () => {
    if (offSet > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setOffset(offSet - limit);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-auto gap-5">
      <div
        className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {
          error ? (
            <div className="py-4 text-lg font-bold text-center text-red-500 col-span-full">There is an error loading the latest blogs.</div>
          ) : (
            !isPending &&
            data &&
            data.blogs.map((blog: IBlog, index: number) => {
              return (<BlogCard key={index} blog={blog} />)
            })
          )
        }
        <LoadingBlogs
          loading={isPending} />

        <div className='w-full md:col-span-2 lg:col-span-3 flex justify-end font-roboto pt-10'>
          <div
            className="pagination-controls w-full md:w-96 h-auto flex flex-row items-center justify-between">
            <Button
              onClick={handlePrev}
              disabled={offSet === 0}>
              Previous
            </Button>
            <div className='flex flex-row items-center justify-center gap-2'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`w-5 h-5 flex items-center justify-center ${page == currentPage ? "rounded-full bg-primary text-white" : "cursor-pointer"}`}>
                  <span className='text-sm'>{page}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={handleNext}
              disabled={offSet + limit >= total}>
              Next
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}


