import React from 'react'

export default function BlogDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-pulse space-y-6">
      <div className="h-8 md:h-10 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/6"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mt-8"></div>
    </div>
  )
}
