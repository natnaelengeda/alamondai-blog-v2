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
import { IconHeart, IconHeartFilled, IconMessageDots, IconShare, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

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
  const [currentPage, setCurrentPage] = useState(0); // New state for pagination
  const commentsPerPage = 5; // Number of comments per page

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
          const status = response.status;
          if (status == 200) {
            queryClient.refetchQueries({ queryKey: ['blog', blog.slug] });
            setIsLiked(!isLiked);
          }
        }).catch((error: any) => {
          logError("blog", "component", "handleLikeBlog", error);
        });

    } catch (error) {
      logError('like-blog', 'like-blog-function', 'blog-[slug]', error)
      // console.error('Error liking blog:', error);
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

  // Pagination logic
  const startIndex = currentPage * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const displayedComments = blog.comments ? blog.comments.slice(startIndex, endIndex) : [];
  const totalPages = blog.comments ? Math.ceil(blog.comments.length / commentsPerPage) : 0;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(0);

      // Determine start and end of the middle section
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages - 2, currentPage + 2);

      if (currentPage < 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 5;
      }

      // Add '...' if needed after the first page
      if (startPage > 1) {
        pageNumbers.push(-1); // Sentinel for '...'
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add '...' if needed before the last page
      if (endPage < totalPages - 2) {
        pageNumbers.push(-1); // Sentinel for '...'
      }

      // Always show last page
      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  };

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
          <h2 className="mb-4 text-xl font-bold">Comments</h2>
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
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">Please log in to leave a comment.</p>
            </div>
          )}
          <div className="mt-4">
            {/* Existing comments will be listed here */}
            {blog.comments && blog.comments.length > 0 ? (
              <div>
                {displayedComments.map((comment) => (
                  <div key={comment.id} className="py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-800">{comment.content}</p>
                      <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                ))}
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 space-x-2">
                    <Button
                      radius="xl"
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      <IconArrowLeft />
                    </Button>
                    <div className='flex items-center justify-center w-full gap-2'>
                      {getPageNumbers().map((pageNumber, index) => (
                        pageNumber === -1 ? (
                          <span key={index} className="px-2 py-1">...</span>
                        ) : (
                          <Button
                            key={pageNumber}
                            radius="xl"
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            variant={currentPage === pageNumber ? 'filled' : 'outline'}
                          >
                            {pageNumber + 1}
                          </Button>
                        )
                      ))}
                    </div>
                    <Button
                      radius="xl"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage === totalPages - 1}>
                      <IconArrowRight />
                    </Button>
                  </div>
                )}
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
