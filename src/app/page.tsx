"use client";

import { useState } from "react";

import Image from "next/image";

// Components
import LatestBlogs from "@/components/latest-blogs";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Icons
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import axios from "@/utils/axios";

// Styles
import styles from "@/styles/SearchInput.module.css";

export default function Home() {
  const [isSearchExpanded, setisSearchExpanded] = useState(true);
  const [showInput, setShowInput] = useState(false);

  // Handle expand
  const handleExpand = () => {
    setShowInput(true);
    setisSearchExpanded(true);
  };

  // Handle collapse with animation
  const handleCollapse = () => {
    setisSearchExpanded(false);
    setTimeout(() => setShowInput(false), 300); // match animation duration
  };



  return (
    <div className="w-full h-full px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto font-serif">
      {/* Main Content */}
      <div className="w-full h-full mx-auto xl:container flex flex-col items-start justify-start pt-5 gap-5 ">

        <div className="w-full h-auto">

          {/* Title */}
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl font-bold ">Alamondai Blog</h1>
          </div>

          <div className="w-full flex flex-row items-center justify-between mt-20 border-b border-gray-200 pb-2 font-roboto">
            {/* Latest / Newsletter */}
            <div className="flex flex-row items-center justify-between divide-x-2 divide-gray-300 space-x-2 gap-2 text-gray-500">
              <p className="uppercase pr-5 cursor-pointer">latest</p>
              <p className="uppercase cursor-pointer">newsletter</p>
            </div>

            {/* Social Media */}
            <div
              className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-end gap-2">
                <IoIosSearch
                  onClick={handleExpand}
                  className="text-2xl text-gray-500 hover:text-black cursor-pointer" />
                {showInput && (
                  <input
                    className={`
                    ${styles.searchInput}
                    ${isSearchExpanded ? styles.searchInputExpanded : styles.searchInputCollapsed}
                  `}
                    placeholder="Search"
                    onBlur={handleCollapse}
                    autoFocus={isSearchExpanded}
                  />
                )}
              </div>
              <FaFacebook
                onClick={() => {
                  window.open("https://web.facebook.com/profile.php?id=61557949859443", "_blank")
                }}
                className="text-2xl text-gray-500 hover:text-black cursor-pointer" />
              <FaInstagram
                onClick={() => {
                  window.open("https://www.instagram.com/alamondai/", "_blank")
                }}
                className="text-2xl text-gray-500 hover:text-black cursor-pointer" />
              <CiLinkedin
                onClick={() => {
                  window.open("https://www.linkedin.com/company/102334748/admin/dashboard/", "_blank")
                }}
                className="text-2xl text-gray-500 hover:text-black cursor-pointer" />
            </div>

          </div>

        </div>
        {/* Banner */}
        <div
          className="w-2/3 h-[26rem] bg-primary">
          <Image
            className="w-full h-full object-cover object-top"
            src={AppAsset.FrontPageHero}
            alt="Alamondai Blog" />
        </div>
        <LatestBlogs />
      </div>
    </div>
  );
}

