"use client";

import React from 'react'

// Components
import ViewBlog from './ViewBlog';
import BlogDetailSkeleton from './BlogDetailSkeleton';

// Hooks
import { useScrollToTop } from '@/lib/useScrollToTop';

// Api
import { useBlog } from '@/api/blog';

export default function LoadBlog({ slug }: { slug: string }) {

  const { data, isLoading, error } = useBlog(slug.toString());

  useScrollToTop();

  if (isLoading) {
    return <BlogDetailSkeleton />
  };

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold text-lg">Error loading blog post.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-gray-500 font-bold text-lg">Blog post not found.</p>
      </div>
    );
  };

  return <ViewBlog blog={data} />;

}
