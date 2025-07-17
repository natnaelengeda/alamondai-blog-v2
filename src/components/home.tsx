"use client";

import React, { useState } from 'react'

// Components
import Title from "@/components/title";
import LatestBlogs from "@/components/latest-blogs";
import FeaturedBlog from "@/components/featured-blog";
import HeadingBar from "@/components/heading-bar";
import NewsLetter from './newsletter';

export default function Home() {
  const [tab, setTab] = useState<string>("latest");

  return (
    <div className="w-full h-full mx-auto container flex flex-col items-start justify-start pt-5 gap-5 ">

      <div className="w-full h-auto">
        <Title />
        <HeadingBar
          setTab={setTab} />
      </div>
      <div className='w-full h-auto'>
        {tab === 'latest' && <LatestTab />}
        {tab === 'newsletter' && <NewsLetter />}
      </div>

    </div>
  )
}

const LatestTab = () => {
  return (
    <>
      <FeaturedBlog />
      <LatestBlogs />
    </>
  );
}
