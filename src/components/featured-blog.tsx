"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// React Query
import { useQuery } from '@tanstack/react-query';

// Mantine
import { Avatar } from '@mantine/core';

// Api
import { fetchFeaturedBlog } from "@/api/blog";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Utils
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';
import { truncateText } from '@/utils/truncateText';

export const convertFullDateToDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript

  switch (month) {
    case 1:
      return `January ${date.getDate()}`;
    case 2:
      return `February ${date.getDate()}`;
    case 3:
      return `March ${date.getDate()}`;
    case 4:
      return `April ${date.getDate()}`;
    case 5:
      return `May ${date.getDate()}`;
    case 6:
      return `June ${date.getDate()}`;
    case 7:
      return `July ${date.getDate()}`;
    case 8:
      return `August ${date.getDate()}`;
    case 9:
      return `September ${date.getDate()}`;
    case 10:
      return `October ${date.getDate()}`;
    case 11:
      return `November ${date.getDate()}`;
    case 12:
      return `December ${date.getDate()}`;
    default:
      return `Invalid month`;
  }

}

export default function FeaturedBlog() {
  const router = useRouter();
  const [avatarColor, setAvatarColor] = useState<string>("blue");
  const [initials, setInitials] = useState<string>("");

  const { isPending, data, } = useQuery({
    queryKey: ['featured-blog'],
    queryFn: fetchFeaturedBlog,
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes fresh
    refetchOnWindowFocus: false, // 👌 prevent refetch when tab refocus
  });



  useEffect(() => {
    if (data && data.length > 0) {
      const init = initialExtract(data[0].user.fullName);
      const avatColor = lettersToHexColor(init);
      setInitials(init);
      setAvatarColor(avatColor);
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="w-full animate-pulse space-y-4 p-4 grid grid-cols-3 mx-auto gap-5">

        {/* Image Card */}
        <div className="w-full h-70 bg-gray-200 rounded col-span-2"></div>

        <div className='w-full col-span-1 flex flex-col gap-10'>
          <div className="space-y-2 mt-4">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>

          <div className="w-full flex flex-row items-start justify-start gap-3">
            {/* Profile Circle */}
            <div className="w-12 h-10 rounded-full bg-gray-300">
            </div>
            {/* Notes */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isPending && data && data.length > 0) {
    return (
      <article
        onClick={() => router.push(`/blog/${data[0].slug}`)}
        className="w-full space-y-4 p-4 grid grid-cols-1 md:grid-cols-3 mx-auto md:gap-5 cursor-pointer">

        {/* Image Card */}
        <div
          className="w-full h-75 bg-gray-200 rounded col-span-2">
          {/* Cover image if exists */}
          {data[0].cover_image_url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${data[0].cover_image_url.id}`}
              alt={`Cover for ${data.title}`}
              className="w-full h-full object-cover"
              width={700}       // Set to expected display width in pixels
              height={256}      // Set to expected display height in pixels
              loading="lazy"
            />
          ) : (
            <Image
              src={AppAsset.DefaultBlogImage}
              alt={`Cover for ${data.title}`}
              className="w-full h-60 md:h-48 object-cover border border-gray-300"
              loading="lazy"
            />
          )}
        </div>

        <div className='w-full col-span-1 flex flex-col gap-4 md:gap-10'>
          <div className="space-y-2 md:mt-4">
            <div className="w-full">
              <h1 className='text-lg md:text-3xl font-bold'>{truncateText(data[0].title, 50)}</h1>
            </div>
            <div className="w-5/6">
              <p className='text-sm md:text-lg font-light'>{truncateText(data[0].excerpt, 50)}</p></div>
          </div>

          <div className="w-full flex flex-row items-start justify-start gap-3">
            {/* Profile Circle */}
            <Avatar
              radius="xl"
              color={avatarColor}
              size={45}
              className='cursor-pointer'>
              {initials}
            </Avatar>
            {/* Notes */}
            <div className="w-full flex flex-col items-start justify-start">
              <div className="">
                <h1>{data[0].user.fullName}</h1>
              </div>
              <div
                className="">
                <p className='text-sm text-gray-400'>{convertFullDateToDate(data[0].published_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

}

