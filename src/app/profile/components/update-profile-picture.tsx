"use client";

import React, { useState, useRef } from 'react'
import { Modal, Button, Avatar } from '@mantine/core';

import imageCompression from "browser-image-compression";
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImage, UserState } from '@/state/user';

interface ImageFile {
  file: File
  preview: string
  id: string
}

interface UpdateProfilePictureModalProps {
  opened: any;
  close: () => void;
  avatarColor: string;
  initials: string;
}

export default function UpdateProfilePictureModal({ opened, close, avatarColor, initials }: UpdateProfilePictureModalProps) {
  const [image, setImage] = useState<ImageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    if (image?.preview) {
      URL.revokeObjectURL(image.preview);
    }

    const options = {
      maxSizeMB: .5,               // Maximum size in MB
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const newImage: ImageFile = {
      file: compressedFile,
      preview: URL.createObjectURL(compressedFile),
      id: Math.random().toString(36).substr(2, 9),
    };

    setImage(newImage);
    setLoading(false);
  };

  const uploadImage = async () => {
    setLoading(true);

    if (image) {
      const file = image.file;
      const user = auth.currentUser;
      const token = await user?.getIdToken();

      const formData = new FormData();
      formData.append('file', file); // 'file' must match the server field name

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // DO NOT set Content-Type manually for FormData!
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setImage(null);
        toast.success("Image Update Success");
        dispatch(updateProfileImage({ avatarUrl: data.imageUrl }));
        close();
      } else {
        const err = await response.text();
        toast.error("Upload failed: " + err);
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title="Update Profile Picture">
      <div
        className='flex flex-col items-start justify-start w-full h-auto min-h-96'>
        {/* View Image */}
        <div
          className='flex items-center justify-center w-full h-auto'>
          <div className='flex items-center justify-center overflow-hidden rounded-full w-72 h-72'>
            {
              (image && image.preview) ?
                (<Avatar
                  radius="xl"
                  src={image.preview}
                  color={avatarColor}
                  size="100%"
                  className='cursor-pointer'>
                  {initials}
                </Avatar>) :
                ((user.avatarUrl) ? (
                  <Avatar
                    radius="xl"
                    src={user.avatarUrl}
                    color={avatarColor}
                    size={300}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar>
                ) : (
                  <Avatar
                    radius="xl"
                    color={avatarColor}
                    size={300}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar>
                ))
            }
          </div>
        </div>

        {/* Add Update Image*/}
        <div className='flex items-center justify-center w-full gap-5 mt-10'>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            onClick={image ? uploadImage : handleButtonClick}
            loading={loading}
            disabled={loading}>
            {
              image ? "Update Image" : "Select Image"
            }
          </Button>

          {
            image && (
              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  setImage(null);
                }}
                className='ml-4'
                disabled={loading}>
                Remove Image
              </Button>
            )
          }

        </div>
      </div>
    </Modal>
  )
}
