import React from 'react'

// components
import LoadBlog from './components/LoadBlog';

// api
import { getBlogBySlug } from '@/api/blog';

// types
import { IBlog } from '@/types/blog';

export async function generateMetadata({ params }: any) {
  const slug = params.slug;
  const blog: IBlog = await getBlogBySlug(slug);

  console.log(blog)
  const url = process.env.NODE_ENV == "development" ?
    `http://localhost:3000/blog/${slug}` :
    `https://blog.alamondai.com/blog/${slug}`

  const imageUrl =
    blog.cover_image_url ?
      `${process.env.NEXT_PUBLIC_API_URL}/blog/image/${blog.cover_image_url.id}` :
      `https://blog.alamondai.com/seo-image.png`;

  return {
    title: blog.title,
    description: blog.excerpt,
    icons: {
      icon: '/logo.png',
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: imageUrl,
    },
  };
}

export default function Slug({ params }: any) {
  const slug = params.slug;
  return (
    <LoadBlog slug={slug} />
  )
}
