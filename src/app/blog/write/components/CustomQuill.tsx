"use client";

import React, { useEffect, useMemo, useRef } from "react";

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

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const user = auth.currentUser;
        const token = await user?.getIdToken();

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload/blog-image-individual`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            // DO NOT set Content-Type manually when sending FormData
          },
          body: formData,
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
      clipboard: {
        matchVisual: false,
      },
      scrollingContainer: '.quill-editor', // Important
    },
  }), []);

  useEffect(() => {
    const toolbar = document.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.add("sticky", "top-0", "z-50", "bg-white", "border-b");
    }
  }, []);

  return (
    <div className="quill-editor w-full h-40 max-h-[80vh] overflow-y-auto border border-gray-300">
      <ReactQuill className='w-full'
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Write your blog here..." />
    </div>
  );
};

export default CustomQuill;