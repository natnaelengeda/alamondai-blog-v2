import Image from 'next/image';

import DOMPurify from 'dompurify';  // Optional but HIGHLY recommended for safety
import AppAsset from '@/core/AppAsset';

// Types
import { IBlog } from '@/types/blog'

export default function ViewBlog({ blog }: { blog: IBlog }) {
   const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(blog.published_at).toLocaleDateString()} by Author {blog.user.fullName}
      </p>

      {blog.cover_image_url ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${blog.cover_image_url.id}`}
          alt={blog.title}
          width={700}       // Set to expected display width in pixels
          height={256}      // Set to expected display height in pixels
          className="w-full h-64 md:h-[26rem] object-cover rounded-xl mb-6"
        />
      ) : (
        <Image
          src={AppAsset.DefaultBlogImage}
          alt={blog.title}
          className="w-full h-64 md:h-[26rem] object-cover rounded-xl mb-6 border border-gray-200"
        />
      )}

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      <div className="mt-8 text-xs text-gray-400">
        Last updated: {new Date(blog.updated_at).toLocaleDateString()}
      </div>
    </div>
  )
}
