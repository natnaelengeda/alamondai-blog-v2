"use client";

"use client";
import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Loader } from '@mantine/core';
// import Form from './components/Form';

// redux
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// css
import 'react-quill/dist/quill.snow.css'

// api
import axios from "@/utils/axios";
import { auth } from '@/lib/firebase';
import { useQueryClient } from '@tanstack/react-query';

// utils
import toast from 'react-hot-toast';
import { logError } from "@/utils/logError";
import imageCompression from "browser-image-compression";

// Api
import { useBlog } from '@/api/blog';
import Form from '../../write/components/Form';
import CustomQuill from '../../write/components/CustomQuill';

const initialContent = `
  <h1 style="color: #999;">Header 1</h1>
  <p style="color: #bbb;">Normal text here...</p>
`

interface ImageFile {
  file: File
  preview: string
  id: string
}
export default function page({ params }: any) {
  const slug = params.slug;
  const router = useRouter();
  const user = useSelector((state: { user: UserState }) => state.user);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(initialContent)
  const [image, setImage] = useState<ImageFile | null>(null);

  const [loading, setLaoding] = useState(false);
  const [isCompressingImage, setIsCompressingImage] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isPending, error } = useBlog(slug.toString());

  const handleFileSelect = useCallback(async (file: File[]) => {
    setIsCompressingImage(true);
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    const options = {
      maxSizeMB: .7,               // Maximum size in MB
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

  const uploadImageAsFormData = async () => {
    try {
      if (!image) return;

      const file = image.file;
      const user = auth.currentUser;
      const token = await user?.getIdToken();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title); // if you want to send title too

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload/blog-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Don't set Content-Type manually!
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error(error);
    }
  };


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
      const uploadImageFunc = await uploadImageAsFormData();
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
      await axios.patch(`/blog/${data?.id}`, {
        title: blogData.title,
        summary: blogData.summary,
        content: blogData.content,
        author: blogData.author,
        imageId: imageId,
        date: blogData.date,
      }).then((response) => {
        const status = response.status;
        if (status == 200) {
          const slug = response.data.slug;
          toast.success("Blog Update Successfull!");
          setTitle("");
          setSummary("");
          setImage(null);
          setContent(initialContent);
          router.push(`/blog/${slug}`);

          queryClient.refetchQueries({ queryKey: ['latest-blogs-9-0'] })
        }

      }).catch((error) => {
        const status = error.response.status;
        if (status == 402) {
          toast.error("User not allowed to Update");
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

  console.log(data)
  useEffect(() => {
    if (data && !isPending) {
      setTitle(data.title);
      setSummary(data.excerpt);
      setContent(data.content);
    }
  }, [data, isPending]);

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
          cover_image_url={data?.cover_image_url}
          handleFileSelect={handleFileSelect}
          removeImage={removeImage} />

        <CustomQuill
          content={content}
          setContent={setContent} />

        <div className='flex items-center justify-end w-full'>
          <button
            className={`px-4 py-2 text-white rounded-sm cursor-pointer flex items-center justify-center gap-2 ${loading ? "bg-gray-200" : "bg-secondary hover:opacity-90"}`}
            disabled={loading}
            onClick={handleSave}>
            {
              loading ?
                <><Loader
                  color="white"
                  size="xs" /> Updating...</> :
                <>Update</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
