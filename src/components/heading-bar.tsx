"use client";

import { useState } from "react";

// Icons
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

// Styles
import styles from "@/styles/SearchInput.module.css";

interface IHeadingBar {
  setTab: React.Dispatch<React.SetStateAction<string>>
}
export default function HeadingBar({ setTab }: IHeadingBar) {
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

  const socialLinks = [
    {
      icon: FaFacebook,
      url: "https://web.facebook.com/profile.php?id=61557949859443"
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/alamondai/"
    },
    {
      icon: CiLinkedin,
      url: "https://www.linkedin.com/company/102334748/admin/dashboard/"
    }
  ];

  return (
    <div className="w-full flex flex-row items-center justify-between mt-20 border-b border-gray-200 pb-2 font-roboto">
      {/* Latest / Newsletter */}
      <div className="flex flex-row items-center justify-between divide-x-2 divide-gray-300 space-x-2 gap-2 text-gray-500">
        <p
          className="uppercase pr-5 cursor-pointer"
          onClick={() => setTab('latest')}>latest</p>
        <p
          className="uppercase cursor-pointer"
          onClick={() => setTab('newsletter')}>newsletter</p>
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
        {socialLinks.map(({ icon: Icon, url }, index) => (
          <Icon
            key={index}
            onClick={() => window.open(url, "_blank")}
            className="text-2xl text-gray-500 hover:text-black cursor-pointer"
          />
        ))}
      </div>
    </div>
  )
}
