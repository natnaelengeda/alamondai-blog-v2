import React from 'react'
import Image from 'next/image';

// App Asset
import AppAsset from '@/core/AppAsset';

// Types
import { IBlogImage } from '@/types/blogImage';

interface IImage {
  title: string;
  cover_image_url: IBlogImage | null;
}
export default function BlogImage({ title, cover_image_url }: IImage) {
  return (
    <>
      {cover_image_url ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${cover_image_url.id}`}
          alt={title}
          width={700}       // Set to expected display width in pixels
          height={256}      // Set to expected display height in pixels
          className="w-full h-64 md:h-[26rem] object-cover rounded-xl mb-6"
          loading="lazy"
        />
      ) : (
        <Image
          src={AppAsset.DefaultBlogImage}
          alt={title}
          className="w-full h-64 md:h-[26rem] object-cover rounded-xl mb-6 border border-gray-200"
          loading="lazy"
        />
      )}
    </>
  )
}
