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
    <footer className='w-full h-20 pr-10'>

      {/* Main Content */}
      <div
        className='w-full h-full mx-auto container flex flex-row items-center justify-end border-t border-gray-200 '>
        {
          options.map((option, index) => {
            return (
              <span
                key={index}
                className='flex items-center gap-1 text-gray-400 hover:text-black cursor-pointer'>
                <p>{option.label}</p>
                {index < options.length - 1 && <span className="mx-2">·</span>}
              </span>
            );
          })
        }
      </div>
    </footer>
  )
}
