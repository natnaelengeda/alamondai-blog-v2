import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import DeleteBlogModal from './delete-blog-modal';

// Mantine
import { Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Menu, Button, Text } from '@mantine/core';

// Utils
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';
import { truncateText } from '@/utils/truncateText';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Types
import { IBlog } from '@/types/blog';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { CiMenuBurger } from 'react-icons/ci';
import { IconDotsVertical } from '@tabler/icons-react';


export type BlogCardProps = {
  blog: IBlog;
  owner?: boolean;
};

export default function BlogCard({ blog, owner = false }: BlogCardProps) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure();
  const [imgSource, setImgSource] = useState<any>(AppAsset.DefaultBlogImage)

  // Deleted blog
  const [deleteBlog, setDeleteBlogs] = useState<{ id: number, title: string } | null>(null);

  const [avatarColor, setAvatarColor] = useState<string>("blue");
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    const init = initialExtract(blog.user.fullName);
    const avatColor = lettersToHexColor(init);
    setInitials(init);
    setAvatarColor(avatColor);
  }, [blog.user.fullName]);

  useEffect(() => {
    if (blog.cover_image_url) {
      setImgSource(`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${blog.cover_image_url.id}`);
    }
  }, [blog.cover_image_url]);

  return (
    <>
      <article
        className="w-full relative space-y-4 p-4 max-w-3xl mx-auto transition-shadow duration-200 cursor-pointer">
        {
          owner == true &&
          <div
            className='absolute top-5 right-5 h- w- flex items-center justify-center z-20'>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div className='flex items-center justify-center cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300 transition-colors'>
                  <IconDotsVertical size={20} />
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    router.push(`/blog/edit/${blog.slug}`)
                  }}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setDeleteBlogs({ id: blog.id, title: blog.title })
                    open();
                  }}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        }
        <Image
          onClick={() => {
            router.push(`/blog/${blog.slug}`)
          }}
          src={imgSource}
          alt={`Cover for ${blog.title}`}
          width={240}
          height={192}
          className="w-full h-60 md:h-48 object-cover border border-gray-300"
          loading="lazy"
          onError={() => {
            setImgSource(AppAsset.DefaultBlogImage)
          }}
        />
        <header
          onClick={() => {
            router.push(`/blog/${blog.slug}`)
          }}
          className="flex items-center gap-3">
          <div
            className='flex flex-col items-start justify-start'>
            <h2
              className="text-lg font-semibold text-gray-900">
              {truncateText(blog.title, 55)}
            </h2>
            <h2
              className="prose max-w-full text-gray-700 text-sm">
              {truncateText(blog.excerpt, 80)}
            </h2>
          </div>
        </header>

        <div
          onClick={() => {
            router.push(`/blog/${blog.slug}`)
          }}
          className='flex flex-row items-start justify-start gap-2'>
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
