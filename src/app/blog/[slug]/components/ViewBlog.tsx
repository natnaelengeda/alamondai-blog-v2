import { useEffect, useState } from 'react';
import Image from 'next/image';

// Mantine
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import DOMPurify from 'dompurify';  // Optional but HIGHLY recommended for safety

// State
import { UserState } from '@/state/user';
import { useSelector } from 'react-redux';

// Api
import axios from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';

// Toast
import toast from 'react-hot-toast';

import AppAsset from '@/core/AppAsset';

// Types
import { IBlog } from '@/types/blog'
import { IconHeart, IconHeartFilled, IconMessageDots, IconShare } from '@tabler/icons-react';

export default function ViewBlog({ blog }: { blog: IBlog }) {
  const [showComments, setShowComments] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state: { user: UserState }) => state.user);
  const queryClient = useQueryClient();

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  const handlePostComment = async () => {
    setCommentLoading(true);
    try {
      axios.post('/blog/add-comment', { blogId: blog.id, content: commentText })
        .then((response) => {
          const status = response.status;
          if (status == 200) {
            toast.success("Comment Added Successfully");
            queryClient.refetchQueries({ queryKey: ['blog', blog.slug] });
          }
        })
      setCommentText(''); // Clear the textarea
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLikeBlog = async () => {
    try {
      axios.post('/blog/like-blog', { blogId: blog.id })
        .then((response) => {
          console.log(response);
          const status = response.status;
          if (status == 200) {
            queryClient.refetchQueries({ queryKey: ['blog', blog.slug] });
            setIsLiked(!isLiked);
          }
        }).catch((error) => {

        });

    } catch (error) {
      console.error('Error liking blog:', error);
      alert('Failed to like blog.');
    }
  };

  const handleShareBlog = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
      axios.post('/blog/share-blog', { blogId: blog.id });
      queryClient.refetchQueries({ queryKey: ['blog', blog.slug] });
      close();
    } catch (error) {
      console.error('Error sharing blog:', error);
      toast.error('Failed to copy link.');
    }
  };

  const blogActions = [
    {
      label: "Like",
      count: blog.likes.length,
      icon: <IconHeart className='' />,
      onClick: handleLikeBlog,
      hoverColor: "hover:text-blue-500"
    },
    {
      label: "Comment",
      count: blog.comments.length,
      icon: <IconMessageDots />,
      onClick: () => setShowComments(prev => !prev),
      hoverColor: "hover:text-green-500"
    },
    {
      label: "Share",
      count: blog.shareCount,
      icon: <IconShare />,
      onClick: open,
      hoverColor: "hover:text-purple-500"
    }
  ]

  useEffect(() => {
    setIsLiked(blog?.likes?.some(item => item.likerId === user.id) ?? false);
  }, []);

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
        <button
          className={`flex items-center space-x-2 text-gray-600 hover:text-primary cursor-pointer`}
          onClick={handleLikeBlog}>
          {
            isLiked ? <IconHeartFilled className='text-primary' /> : <IconHeart className='' />
          }
          <span>Like ({blog.likes.length})</span>
        </button>
        {blogActions.slice(1, 3).map((action, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 text-gray-600 ${action.hoverColor} cursor-pointer`}
            onClick={action.onClick}>
            {action.icon}
            <span>{action.label} ({action.count})</span>
          </button>
        ))}
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
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)} />
              <Button
                className="mt-2"
                onClick={handlePostComment}
                loading={commentLoading}>
                Post Comment
              </Button>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">Please log in to leave a comment.</p>
            </div>
          )}
          <div className="mt-4">
            {/* Existing comments will be listed here */}
            {blog.comments && blog.comments.length > 0 ? (
              <div>
                {blog.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 py-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-800">{comment.content}</p>
                      <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Share Blog"
        centered>
        <div className="flex flex-col gap-4">
          <div className='w-full h-10 rounded flex items-center justify-between pl-3 border border-gray-300'>
            <p>{window.location.href}</p>
            <Button onClick={handleShareBlog}>Copy Link</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
