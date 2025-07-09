"use client";

import React from 'react'
import ReactQuill from 'react-quill'

interface IEditor{
  content: any;
  setContent: any;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'blockquote', 'code-block', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'link', 'blockquote', 'code-block', 'image',
  'list', 'bullet'
]

export default function Editor({content, setContent}: IEditor) {
  return (
     <ReactQuill
          className='w-full'
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Write your blog here..."
        />
  )
}
