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
    <div className="container flex flex-col items-start justify-start w-full h-full gap-5 pt-5 mx-auto ">

      <div className="w-full h-auto">
        <Title text={"Alamondai Blog"} />
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
