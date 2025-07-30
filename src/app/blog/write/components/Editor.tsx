"use client";

import { useRef } from 'react';
import ReactQuill from 'react-quill'

// firebase
import { auth } from '@/lib/firebase';
import { logError } from '@/utils/logError';

interface IEditor {
  content: any;
  setContent: any;
}

const modules = (imageHandler: () => void) => ({
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'blockquote', 'code-block', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  handlers: {
    image: imageHandler,
  }
})

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'link', 'blockquote', 'code-block', 'image',
  'list', 'bullet'
]

export default function Editor({ content, setContent }: IEditor) {
  const quillRef = useRef<any>(null);


  const handleImageUpload = async () => {

    const user = auth.currentUser;
    const token = await user?.getIdToken();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // const formData = new FormData();
      // formData.append('file', file);

      //  const file = image?.file;
      const arrayBuffer = await file.arrayBuffer();

      // Create headers with proper content type
      const headers: HeadersInit = {
        'Content-Type': file.type,
        'Authorization': `Bearer ${token}`,
        'X-File-Name': encodeURIComponent(file.name),
        'X-File-Size': file.size.toString(),
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload-blog-image-individual`, {
          method: 'POST',
          headers,
          body: arrayBuffer,
        });

        const { url } = await res.json();

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', url);
      } catch (error) {
        logError('image-upload', 'image-upload-function', 'image-upload', error)
        // console.error('Image upload failed', err);
      }
    };
  };

  return (
    <ReactQuill
      className='w-full'
      ref={quillRef}
      value={content}
      onChange={setContent}
      modules={modules(handleImageUpload)}
      formats={formats}
      theme="snow"
      placeholder="Write your blog here..."
    />
  )
}
