// "use client";

// import React, { useEffect, useMemo, useRef } from "react";
// import dynamic from 'next/dynamic';
// import ImageResize from 'quill-image-resize-module-react';


// // import ReactQuill, { Quill } from "react-quill";

// // import ReactQuill from "react-quill";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import "react-quill/dist/quill.snow.css";
// import Quill from "quill";

// // firebase
// import { auth } from '@/lib/firebase';

// let registered = false;

// const formats = [
//   'header',
//   'bold', 'italic', 'underline', 'strike',
//   'link', 'blockquote', 'code-block', 'image',
//   'list', 'bullet'
// ]

// const CustomImageHandler = (quillRef: React.RefObject<ReactQuill>) => {
//   return async () => {

//     const user = auth.currentUser;
//     const token = await user?.getIdToken();

//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];
//       if (file) {
//         // const formData = new FormData();
//         // formData.append("image", file);

//         const arrayBuffer = await file.arrayBuffer();


//         // Create headers with proper content type
//         const headers: HeadersInit = {
//           'Content-Type': file.type,
//           'Authorization': `Bearer ${token}`,
//           'X-File-Name': encodeURIComponent(file.name),
//           'X-File-Size': file.size.toString(),
//         };

//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/upload/blog-image-individual`, {
//           method: "POST",
//           headers,
//           body: arrayBuffer,
//         });

//         const data = await res.json();
//         const range = quillRef.current?.getEditor().getSelection(true);
//         quillRef.current?.getEditor().insertEmbed(range?.index || 0, "image", data.url);
//       }
//     };
//   };
// };

// interface IEditor {
//   content: any;
//   setContent: any;
// }

// const CustomQuill = ({ content, setContent }: IEditor) => {
//   const quillRef = useRef<ReactQuill>(null);

//   // const modules = useMemo(() => ({
//   //   toolbar: [
//   //     // container: [
//   //     [{ header: [1, 2, false] }],
//   //     ["bold", "italic", "underline"],
//   //     ["image", "code-block"],
//   //   ],
//   //   // ]
//   //   handlers: {
//   //     image: CustomImageHandler(quillRef),
//   //   },
//   //   imageResize: {
//   //     modules: ['Resize', 'DisplaySize', 'Toolbar'],
//   //   },
//   // }), []);

//   const amodules = {
//     toolbar: [
//       ["bold", "italic", "underline", "strike"],
//       ["blockquote", "code-block"],
//       [{ header: 1 }, { header: 2 }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ color: [] }, { background: [] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["link", "image"],
//       ["clean"],
//     ],
//     // handlers: {
//     //   image: CustomImageHandler(quillRef),
//     // },
//     imageResize: {
//       // parchment: Quill.import("parchment"),
//     },
//   };

//   const modules = useMemo(() => ({
//     toolbar: [
//       ["bold", "italic", "underline", "strike"],
//       ["blockquote", "code-block"],
//       [{ header: 1 }, { header: 2 }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ direction: "rtl" }],
//       [{ size: ["small", false, "large", "huge"] }],
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ color: [] }, { background: [] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["link", "image"],
//       ["clean"],
//     ],
//     handlers: {
//       // image: CustomImageHandler(quillRef),
//     },
//     imageResize: {},
//   }), []);


//   // if (typeof window !== 'undefined' && Quill && !Quill?.__registered) {
//   //   Quill.register('modules/imageResize', ImageResize);
//   //   Quill.__registered = true;
//   // }

//   useEffect(() => {
//     if (!registered && typeof window !== "undefined") {
//       // Register once on client side
//       Quill.register("modules/imageResize", ImageResize);
//       registered = true;
//     }
//   }, []);

//   // useEffect(() => {
//   //   if (typeof window !== "undefined" && Quill && !(Quill as any).__registered) {
//   //     Quill.register("modules/imageResize", ImageResize);
//   //     (Quill as any).__registered = true;
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (typeof window !== 'undefined' && Quill) {
//   //     const quillWithFlag = Quill as any;
//   //     if (!quillWithFlag.__registered) {
//   //       quillWithFlag.register('modules/imageResize', ImageResize);
//   //       quillWithFlag.__registered = true;
//   //     }
//   //   }
//   // }, [window]);


//   return (
//     <ReactQuill className='w-full'
//       ref={quillRef}
//       value={content}
//       onChange={setContent}
//       modules={modules}
//       formats={formats}
//       theme="snow"
//       placeholder="Write your blog here..." />
//   );
// };

// export default CustomQuill;