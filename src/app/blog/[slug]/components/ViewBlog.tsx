import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import DOMPurify from 'dompurify';  // Optional but HIGHLY recommended for safety
import AppAsset from '@/core/AppAsset';

// Types
import { IBlog } from '@/types/blog'
import { UserState } from '@/state/user';

export default function ViewBlog({ blog }: { blog: IBlog }) {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state: { user: UserState }) => state.user);

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

      <div className="max-w-full md:max-w-[35rem] mx-auto flex items-center justify-around mt-8 p-4 border-t border-b border-gray-200">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500" onClick={() => setShowComments(!showComments)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="max-w-full md:max-w-[35rem] mx-auto mt-8 p-4 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {/* Placeholder for comments list */}
          {user.isLoggedIn ? (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Write your comment..."
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Post Comment
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">Please log in to leave a comment.</p>
            </div>
          )}
          <div className="mt-4">
            {/* Existing comments will be listed here */}
            <p className="text-gray-700">No comments yet. Be the first to comment!</p>
          </div>
        </div>
      )}

    </div>
  )
}
