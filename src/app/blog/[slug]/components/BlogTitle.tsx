import React from 'react'

export default function BlogTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
  )
}
