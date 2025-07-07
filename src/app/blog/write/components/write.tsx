"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// Styles
import 'react-quill/dist/quill.snow.css';
import "./styles.css";

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ title, content, coverImage });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="blog-editor">
      <form onSubmit={handleSubmit}>
        {/* Cover Image Upload */}
        <div className="cover-image-upload">
          <label htmlFor="cover-image">
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="cover-preview" />
            ) : (
              <div className="cover-placeholder">
                <span>+ Add a cover image</span>
              </div>
            )}
          </label>
          <input
            id="cover-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          className="blog-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Editor */}
        {/* <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Tell your story..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        /> */}

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent} />

        {/* Publish Button */}
        <button type="submit" className="publish-button">
          Publish
        </button>
      </form>
    </div>
  )
}
