"use client";

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

import DOMPurify from 'dompurify';  // Optional but HIGHLY recommended for safety

// Axios
import axios from "@/utils/axios";
import toast from 'react-hot-toast';

export interface IBlog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: number;
  cover_image_url: string | null;
  tags: string[] | null;
  is_published: boolean;
  published_at: string; // ISO date string
  created_at: string;   // ISO date string
  updated_at: string;   // ISO date string
}

export default function Slug() {
  const { slug } = useParams();
  const [post, setPost] = useState<IBlog | null>(null);
  const [sanitizedContent, setsanitizedContent] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    try {
      axios.get(`/blog/get-by-slug/${slug}`)
        .then((response) => {
          const status = response.status;
          if (status == 200) {
            console.log(response)
            setPost(response.data);
            setsanitizedContent(DOMPurify.sanitize(response.data.content));
            setIsLoading(false);
          }
        })
    } catch (error) {
      toast.error("Unable to Fetch Blog")
    }
  }

  useEffect(() => {
    fetchPost();
  }, [slug]);


  if (isLoading || !post) {
    return <BlogDetailsSkeleton />
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(post.published_at).toLocaleDateString()} by Author #{post.author_id}
      </p>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
        />
      )}

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      <div className="mt-8 text-xs text-gray-400">
        Last updated: {new Date(post.updated_at).toLocaleDateString()}
      </div>
    </div>
  )
}

function BlogDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse space-y-6">
      <div className="h-8 md:h-10 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/6"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mt-8"></div>
    </div>
  );
}