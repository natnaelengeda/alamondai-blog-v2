// src/app/blog/write/components/TiptapEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useState } from 'react';

// Styles
import "./tiptap.css";

const TiptapEditor = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: '<p>Start writing your blog post here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCoverImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML();
    console.log({ title, content, coverImage });
    // Submit to your API here
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* Cover Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div className="flex items-center space-x-4">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-sm"
            >
              {coverImage ? 'Change' : 'Upload'} Cover
            </label>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Blog post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold mb-6 p-2 border-b focus:outline-none focus:border-blue-500"
        />

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            List
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-100"
          >
            Image
          </button>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} className="border rounded" />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default TiptapEditor;