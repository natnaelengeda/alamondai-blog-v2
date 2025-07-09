"use client";
import React, { useState,Suspense } from 'react'
import dynamic from 'next/dynamic';

import { Loader, TextInput } from '@mantine/core';

// Staes
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// CSS
import 'react-quill/dist/quill.snow.css'

// Axios
import axios from "@/utils/axios";
import toast from 'react-hot-toast';


const Editor = dynamic(()=> import("./components/Editor"), {ssr: false});

const initialContent = `
  <h1 style="color: #999;">Header 1</h1>
  <p style="color: #bbb;">Normal text here...</p>
`

export default function Page() {
  const user = useSelector((state: { user: UserState }) => state.user);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(initialContent)
  const [loading, setLaoding] = useState(false);

  const handleSave = async () => {
    setLaoding(true);
    const blogData = {
      title,
      summary,
      content,
      author: user.id,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("/blog", {
        title: blogData.title,
        summary: blogData.summary,
        content: blogData.content,
        author: blogData.author,
        date: blogData.date
      }).then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success("Blog Posted Successfully!");
          setTitle("");
          setContent(initialContent);
        }

      }).catch((error) => {
        const status = error.response.status;
        if (status == 404) {
          toast.error("Unable to find User");
        } else {
          toast.error("Internal Server Error");
        }
      }).finally(() => {
        setLaoding(false);
      })
    } catch (error) {
    }
  }

   return (
    <div className='w-full h-full container mx-auto pt-10'>
      <div className='w-full h-full flex flex-col items-start justify-start gap-5'>
        {/* Title */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor="title"
            className='font-semibold'>Title</label>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Summary */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor="summary"
            className='font-semibold'>Summary</label>
          <TextInput
            value={summary}
            onChange={(e) => setSummary(e.target.value)} />
        </div>
      <Editor
      content={content}
      setContent={setContent}/>
      
        <div className='w-full flex items-center justify-end'>
          <button
            className="px-4 py-2 bg-secondary text-white rounded-sm cursor-pointer hover:opacity-90"
            disabled={loading}
            onClick={handleSave}>
            {
              loading ?
                <><Loader
                  color="white"
                  size="xs" /> Posting...</> :
                <>Post</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}