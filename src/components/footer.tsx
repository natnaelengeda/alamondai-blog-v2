import React from 'react'

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const options = [
    { id: 0, label: "About Alamondai Blog", link: '/about' },
    { id: 2, label: "Latest Blog", link: "/" },
    { id: 3, label: "Archive", link: "/archive" },
    { id: 4, label: "Alamondai", link: "https://alamondai.com" },
    { id: 5, label: "Terms", link: "/terms-of-service" },
    { id: 6, label: "Privacy", link: "/privacy-policy" },
  ];

  return (
    <footer className='w-full h-auto md:h-20 px-5 md:pr-10 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto'>

      {/* Main Content */}
      <div
        className='container flex flex-col items-start justify-start w-full h-full gap-2 py-4 pb-6 mx-auto border-t border-gray-200 md:flex-row md:items-center md:justify-end md:pb-0 md:py-0'>
        {
          options.map((option, index) => {
            return (
              <span
                key={index}
                onClick={() => router.push(option.link)}
                className='flex items-center gap-1 text-gray-600 cursor-pointer md:text-gray-400 hover:text-black'>
                <p className="text-sm md:text-base">{option.label}</p>
                {index < options.length - 1 && <span className="hidden mx-2 md:flex">·</span>}
              </span>
            );
          })
        }
      </div>
    </footer>
  )
}
