import { db } from '@/lib/firebase'
import { Button } from '@mantine/core'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function TestComponent() {
  const [posts, setPosts] = useState<any[]>([]);

  const createPostFunction = async () => {
    const docRef = await addDoc(collection(db, "blogs"), {
      title: "Title",
      excerpt: "Excerpt",
      slug: "slug",
      content: "Content",
      cover_image_url: "cover_image_url",
      tags: [],
      is_published: false,
      is_featured: false,
      is_featured_alamondai: false,
      published_at: null,
      user_id: "user_id",
      shareCount: 0,
      blog_img_ind: [],
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);
    toast.success("Post created successfully!")
  }

  const fetchBlogsFunction = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs: any[] = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    setPosts(blogs);
  }

  useEffect(() => {
    fetchBlogsFunction();
  }, []);

  return (
    <div
      className='w-full h-full flex flex-col items-start justify-start gap-10'>
      <Button onClick={createPostFunction}>
        Create Post
      </Button>

      <div className='w-full h-full flex flex-col'>
        {posts.map((post) => (
          <div key={post.id} className='w-full h-auto p-4 border rounded mb-4'>
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}

      </div>
    </div>
  )
}
