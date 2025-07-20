import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

// Components
import BlogImage from './BlogImage';
import BlogTitle from './BlogTitle';
import BlogPublishDate from './BlogPublishDate';
import BlogLastUpdated from './BlogLastUpdated';
import LikeCommentShare from './LikeCommentShare';
import BlogContent from './BlogContent';
import BlogShareModal from './BlogShareModal';

// State
import { UserState } from '@/state/user';
import { useSelector } from 'react-redux';

// Types
import { IBlog } from '@/types/blog'

export default function ViewBlog({ blog }: { blog: IBlog }) {

  const [isLiked, setIsLiked] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state: { user: UserState }) => state.user);


  useEffect(() => {
    setIsLiked(blog?.likes?.some(item => item.likerId === user.id) ?? false);
  }, [blog?.likes, user.id]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <BlogTitle
        title={blog.title} />
      <BlogPublishDate
        published_at={blog.published_at}
        fullName={blog.user.fullName} />
      <BlogImage
        title={blog.title}
        cover_image_url={blog.cover_image_url} />
      <BlogContent content={blog.content} />
      <BlogLastUpdated updated_at={blog.updated_at} />
      <LikeCommentShare
        blog={blog}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        user={user}
        open={open} />
      <BlogShareModal
        id={blog.id}
        slug={blog.slug}
        opened={opened}
        close={close} />
    </div>
  )
}
