import React from 'react'

export default function Footer() {
  const options = [
    { id: 0, label: "About Alamondai Blog" },
    { id: 2, label: "Latest Blog" },
    { id: 3, label: "Archive" },
    { id: 4, label: "Alamondai" },
    { id: 5, label: "Terms" },
    { id: 6, label: "Privacy" }
  ];

  return (
    <footer className='w-full h-auto md:h-20 px-5 md:pr-10 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto'>

      {/* Main Content */}
      <div
        className='w-full h-full mx-auto container flex flex-col md:flex-row items-start md:items-center justify-start md:justify-end border-t border-gray-200 gap-2 py-4 pb-6 md:pb-0 md:py-0'>
        {
          options.map((option, index) => {
            return (
              <span
                key={index}
                className='flex items-center gap-1 text-gray-600 md:text-gray-400 hover:text-black cursor-pointer'>
                <p className="text-sm md:text-base">{option.label}</p>
                {index < options.length - 1 && <span className="mx-2 hidden md:flex">·</span>}
              </span>
            );
          })
        }
      </div>
    </footer>
  )
}
