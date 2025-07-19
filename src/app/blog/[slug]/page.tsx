"use client";

import React from 'react'
import Head from 'next/head';
import { useParams } from 'next/navigation';

// Components
import ViewBlog from './components/ViewBlog';
import BlogDetailSkeleton from './components/BlogDetailSkeleton';

// Hooks
import { useScrollToTop } from '@/lib/useScrollToTop';

// Api
import { useBlog } from '@/api/blog';
import { Metadata } from 'next';


export default function Slug() {
  const { slug } = useParams();

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

  return (
    <>
      <Head>
        <title>
          Natnael Engeda Worku
        </title>
        <meta property="og:title" content="Natnael Engeda" />
        <meta property="og:description" content="Natnael Engeda's Blog to Success" />
        <meta property="og:type" content="article" />
      </Head>
      <ViewBlog blog={data} />
    </>
  )
}
