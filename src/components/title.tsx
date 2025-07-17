import React from 'react'

export default function Title({ text }: { text?: string } = { text: "Alamondai Blog" }) {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold md:text-5xl ">{text}</h1>
    </div>
  )
}
