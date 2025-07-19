"use client";

import React, { useMemo, useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// firebase
import { auth } from '@/lib/firebase';


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'link', 'blockquote', 'code-block', 'image',
  'list', 'bullet'
]

const CustomImageHandler = (quillRef: React.RefObject<ReactQuill>) => {
  return async () => {

    const user = auth.currentUser;
    const token = await user?.getIdToken();

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // const formData = new FormData();
        // formData.append("image", file);

        const arrayBuffer = await file.arrayBuffer();


        // Create headers with proper content type
        const headers: HeadersInit = {
          'Content-Type': file.type,
          'Authorization': `Bearer ${token}`,
          'X-File-Name': encodeURIComponent(file.name),
          'X-File-Size': file.size.toString(),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload/blog-image-individual`, {
          method: "POST",
          headers,
          body: arrayBuffer,
        });

        const data = await res.json();
        const range = quillRef.current?.getEditor().getSelection(true);
        quillRef.current?.getEditor().insertEmbed(range?.index || 0, "image", data.url);
      }
    };
  };
};

interface IEditor {
  content: any;
  setContent: any;
}

const CustomQuill = ({ content, setContent }: IEditor) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
      handlers: {
        image: CustomImageHandler(quillRef),
      },
    },
  }), []);

  return (
    <ReactQuill className='w-full'
      ref={quillRef}
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="Write your blog here..." />
  );
};

export default CustomQuill;