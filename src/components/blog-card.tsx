import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import Image from 'next/image';

// Mantine
import { Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Utils
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Types
import { IBlog } from '@/types/blog';
import { MdRemoveCircleOutline } from 'react-icons/md';
import DeleteBlogModal from './delete-blog-modal';

export type BlogCardProps = {
  blog: IBlog;
  owner?: boolean;
};

export default function BlogCard({ blog, owner = false }: BlogCardProps) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();

  // Deleted blog
  const [deleteBlog, setDeleteBlogs] = useState<{ id: number, title: string } | null>(null);

  const [avatarColor, setAvatarColor] = useState<string>("blue");
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    const init = initialExtract(blog.user.fullName);
    const avatColor = lettersToHexColor(init);
    setInitials(init);
    setAvatarColor(avatColor);
  }, []);

  return (
    <>
      <article
        onClick={() => {
          router.push(`/blog/${blog.slug}`)
        }}
        className="w-full relative space-y-4 p-4 max-w-3xl mx-auto transition-shadow duration-200 cursor-pointer">
        {
          owner == true &&
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDeleteBlogs({ id: blog.id, title: blog.title })
              open();
            }}
            className='absolute top-0 right-0 h-8 w-8 flex items-center justify-center bg-red-500 rounded-full z-20'>
            <MdRemoveCircleOutline
              className='text-2xl font-bld text-white' />
          </div>
        }
        {/* Cover image if exists */}
        {blog.cover_image_url ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${blog.cover_image_url.id}`}
            alt={`Cover for ${blog.title}`}
            className="w-full h-60 md:h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <Image
            src={AppAsset.DefaultBlogImage}
            alt={`Cover for ${blog.title}`}
            className="w-full h-60 md:h-48 object-cover border border-gray-300"
            loading="lazy"
          />
        )}

        <header className="flex items-center gap-3">
          <div
            className='flex flex-col items-start justify-start'>
            <h2 className="text-lg font-semibold text-gray-900">{blog.title}</h2>
            <h2 className="prose max-w-full text-gray-700 text-sm">{blog.excerpt}</h2>
          </div>
        </header>

        <div className='flex flex-row items-start justify-start gap-2'>
          {/* Author avatar placeholder */}
          <div
            className="w-10 h-10 rounded-full bg-gray-300 hidden items-center justify-center text-gray-600 font-semibold select-none">
          </div>
          <Avatar
            radius="xl"
            color={avatarColor}
            size={40}
            className='cursor-pointer'>
            {initials}
          </Avatar>
          <div className="flex flex-col items-start justify-start">
            {
              blog.user ?
                <span>
                  <p className='text-sm'>{blog.user.fullName ?? ""}</p>
                </span> :
                <div className="animate-pulse w-20 h-4 space-y-2 bg-gray-300">
                </div>
            }

            <time
              dateTime={blog.published_at}
              className="text-xs text-gray-500">
              {new Date(blog.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </article>
      {
        deleteBlog &&
        <DeleteBlogModal
          deleteBlog={deleteBlog}
          opened={opened}
          close={close} />
      }
    </>
  );
}
