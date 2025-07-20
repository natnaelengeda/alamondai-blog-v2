"use client";
import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic';

import { Loader } from '@mantine/core';

// Staes
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// CSS
import 'react-quill/dist/quill.snow.css'

// Axios
import axios from "@/utils/axios";
import toast from 'react-hot-toast';
import Form from './components/Form';
import { logError } from "@/utils/logError";

import imageCompression from "browser-image-compression";
import { auth } from '@/lib/firebase';
// import CustomQuill from './components/CustomQuill';

// const Editor = dynamic(() => import("./components/Editor"), { ssr: false });
const CustomQuill = dynamic(() => import("./components/CustomQuill"), { ssr: false });

const initialContent = `
  <h1 style="color: #999;">Header 1</h1>
  <p style="color: #bbb;">Normal text here...</p>
`

interface ImageFile {
  file: File
  preview: string
  id: string
}

export default function Page() {
  const user = useSelector((state: { user: UserState }) => state.user);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(initialContent)
  const [image, setImage] = useState<ImageFile | null>(null);

  const [loading, setLaoding] = useState(false);
  const [isCompressingImage, setIsCompressingImage] = useState<boolean>(false);


  const handleFileSelect = useCallback(async (file: File[]) => {
    setIsCompressingImage(true);
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    const options = {
      maxSizeMB: .4,               // Maximum size in MB
      useWebWorker: true,
    };

    const indexOneFile = file[0];
    const compressedFile = await imageCompression(indexOneFile, options);

    const newImage: ImageFile = {
      file: compressedFile,
      preview: URL.createObjectURL(compressedFile),
      id: Math.random().toString(36).substr(2, 9),
    };

    setImage(newImage);
    return setIsCompressingImage(false);
  }, [image]);


  const removeImage = () => {
    setImage(null);
  }

  const uploadImageAsBinary = async () => {
    try {

      if (image) {

        const file = image?.file;
        const arrayBuffer = await file.arrayBuffer();

        const user = auth.currentUser;
        const token = await user?.getIdToken();

        // Create headers with proper content type
        const headers: HeadersInit = {
          'Content-Type': file.type,
          'Authorization': `Bearer ${token}`,
          'X-File-Name': encodeURIComponent(title),
          'X-File-Size': file.size.toString(),
        };

        // Send binary data
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload/blog-image`, {
          method: 'POST',
          headers,
          body: arrayBuffer
        });


        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
        // setImgUploadResult(`Upload successful! File ID: ${result.fileId}`);

      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleSave = async () => {
    if (title == "") {
      return toast.error("Title is required");
    }

    if (summary == "") {
      return toast.error("Summary is required");
    }

    setLaoding(true);

    if (!image) {
      uploadFunction(null);
    } else {
      const uploadImageFunc = await uploadImageAsBinary();
      const imageId = uploadImageFunc.id;
      uploadFunction(imageId);
    }
  }

  const uploadFunction = async (imageId: number | null) => {
    const blogData = {
      title,
      summary,
      content,
      author: user.email,
      imageId: imageId,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("/blog", {
        title: blogData.title,
        summary: blogData.summary,
        content: blogData.content,
        author: blogData.author,
        imageId: imageId,
        date: blogData.date,
      }).then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success("Blog Posted Successfully!");
          setTitle("");
          setSummary("");
          setImage(null);
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
    } catch (error: any) {
      logError("blog", "page", "uploadFunction", error);
    }
  }

  return (
    <div className='container w-full h-full pt-10 mx-auto px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] '>
      <div className='flex flex-col items-start justify-start w-full h-full gap-5 px-4 mx:px-0'>
        <Form
          title={title}
          setTitle={setTitle}
          summary={summary}
          setSummary={setSummary}
          image={image}
          isCompressingImage={isCompressingImage}
          handleFileSelect={handleFileSelect}
          removeImage={removeImage} />
        {/* <Editor
          content={content}
          setContent={setContent} /> */}
        <CustomQuill
          content={content}
          setContent={setContent} />

        <div className='flex items-center justify-end w-full'>
          <button
            className="px-4 py-2 text-white rounded-sm cursor-pointer bg-secondary hover:opacity-90"
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