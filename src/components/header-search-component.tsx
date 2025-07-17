"use client";
import { useState } from "react";
import Link from "next/link";

// Mantine
import { Text } from '@mantine/core';

// Axios
import axios from "@/utils/axios";

// Icon
import { IoIosSearch } from "react-icons/io";

// Styles
import styles from "@/styles/SearchInput.module.css";

// Utils
import { convertFullDateToDate } from "./featured-blog";

export default function HeaderSearchComponent() {
  const [isSearchExpanded, setisSearchExpanded] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [haveSearched, setHaveSearched] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle expand
  const handleExpand = () => {
    setShowInput(true);
    setisSearchExpanded(true);
    setResults([]);
  };

  // Handle collapse with animation
  const handleCollapse = () => {
    setisSearchExpanded(false);
    setTimeout(() => setShowInput(false), 500); // match animation duration
    setTimeout(() => setShowDropdown(false), 500)
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (e.target.value.trim()) {
        searchBlogs(e.target.value);
      } else {
        setResults([]);
      }
    }, 1000); // 1 second debounce

    setTypingTimeout(timeout);

  }

  const searchBlogs = async (searchTerm: string) => {
    try {
      setLoading(true);
      setHaveSearched(true);
      setShowDropdown(true);

      const res = await axios.post("/blog/search", { query: searchTerm });
      const status = res.status;

      if (status === 200) {
        setResults(res.data);
        setLoading(false);
      }
      console.log(res.data)
    } catch (error) {

    }

  }

  function truncateText(text: string, maxLength = 50): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  return (
    <div>
      <div
        className="relative flex flex-row items-center justify-end w-full h-auto gap-2">
        <IoIosSearch
          onClick={handleExpand}
          className="text-2xl text-gray-500 cursor-pointer hover:text-black" />
        {showInput && (
          <>
            <input
              className={`
                    ${styles.searchInput}
                    ${isSearchExpanded ? styles.searchInputExpanded : styles.searchInputCollapsed}
                  `}
              placeholder="Search"
              onBlur={handleCollapse}
              autoFocus={isSearchExpanded}
              onChange={handleInput}
            />
            {showDropdown && (
              <div
                className="absolute z-50 p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-lg top-10 w-96">
                <div className="absolute w-5 h-5 rotate-45 bg-white border-t border-l border-gray-300 -top-3 right-10">

                </div>
                <p className="px-2 pb-1 text-sm font-semibold text-gray-500 border-b">Search</p>
                {
                  results.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {results.slice(0, 5).map((post) => (
                        <li key={post.id} className="px-2 py-2 hover:bg-gray-100">
                          <Link href={`/blog/${post.slug}`}>
                            <p className="text-sm font-medium text-gray-800 truncate">{post.title}</p>
                            <p className="text-xs text-gray-500">{convertFullDateToDate(post.published_at)}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>) :
                    (
                      <div className="flex flex-col items-center justify-center gap-2 py-5">
                        {loading ? (
                          <Text>Loading...</Text>
                        ) : (
                          <Text>No results found</Text>
                        )}
                      </div>
                    )
                }
                <div className="pt-2 text-center border-t">
                  <h1
                    className="text-sm font-medium text-green-600 hover:underline"                >
                    Search on Alamondai Blog
                  </h1>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
