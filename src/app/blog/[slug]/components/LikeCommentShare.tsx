import { useState } from 'react';

// Mantine
import { Button } from '@mantine/core';

// Api
import axios from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';

// Toast
import toast from 'react-hot-toast';
import { logError } from "@/utils/logError";

// Types
import { IBlog } from '@/types/blog'
import { UserState } from '@/state/user';

// Icons
import { IconHeart, IconHeartFilled, IconMessageDots, IconShare } from '@tabler/icons-react';

interface ILikeCommentShare {
  blog: IBlog;
  isLiked: boolean;
  setIsLiked: any;
  user: UserState;
  open: any;
}

export default function LikeCommentShare({ blog, isLiked, setIsLiked, user, open }: ILikeCommentShare) {
  const [showComments, setShowComments] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  const queryClient = useQueryClient();

  async function handlePostComment() {
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
    } catch (error: any) {
      logError("blog", "component", "handlePostComment", error);
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
        }).catch((error: any) => {
          logError("blog", "component", "handleLikeBlog", error);
        });

    } catch (error) {
      console.error('Error liking blog:', error);
      alert('Failed to like blog.');
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
      onClick: () => { setShowComments(prev => !prev) },
      hoverColor: "hover:text-green-500"
    },
    {
      label: "Share",
      count: blog.shareCount,
      icon: <IconShare />,
      onClick: () => { open() },
      hoverColor: "hover:text-purple-500"
    }
  ]

  return (
    <>
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



    </>
  )
}
