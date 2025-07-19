import React from 'react'

interface Types {
  published_at: string;
  fullName: string;
}

export default function BlogPublishDate({ published_at, fullName }: Types) {
  return (
    <p className="text-sm text-gray-500 mb-6">
      Published on {new Date(published_at).toLocaleDateString()} by Author {fullName}
    </p>
  )
}
