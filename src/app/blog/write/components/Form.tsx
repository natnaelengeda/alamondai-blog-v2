import React from 'react';

// Mantine
import { Group, TextInput, Text, Paper, ActionIcon, Badge, Image } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface IForm {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
  handleFileSelect: (file: File[]) => void;
  removeImage: (id: string) => void;
  image: { file: File; preview: string; id: string } | null;
  isCompressingImage: boolean;
  cover_image_url?: any;
}

const formatFileSize = (bytes: number) => {
  return (bytes / 1024).toFixed(1) + " KB"
}

export default function Form({ title, setTitle, summary, setSummary, handleFileSelect, removeImage, image, cover_image_url, isCompressingImage }: IForm) {
  return (
    <div className='w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5'>
      {/* Title */}
      <div
        className='flex flex-col gap-1'>
        <label
          htmlFor="title"
          className='font-semibold'>Title <span className='text-red-500'>*</span></label>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Summary */}
      <div className='flex flex-col gap-1'>
        <label
          htmlFor="summary"
          className='font-semibold'>Summary <span className='text-red-500'>*</span></label>
        <TextInput
          value={summary}
          onChange={(e) => setSummary(e.target.value)} />
      </div>

      {/* Blog Image */}
      <div
        className='flex flex-col gap-1'>
        <label
          htmlFor="blog_image"
          className='font-semibold'>Blog Image</label>
        {
          image == null &&
          <Dropzone
            style={{
              border: '1px solid #ced4da'
            }}
            onDrop={handleFileSelect}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            maxFiles={1}
            accept={IMAGE_MIME_TYPE}
            loading={isCompressingImage}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <p className="text-center text-sm md:text-lg">
                  Drag images here or click to select Image
                </p>
                <p className="text-center text-xs md:text-sm text-gray-500">
                  Attach an Image for you Blog
                </p>
              </div>
            </Group>
          </Dropzone>}
        {image !== null && (
          <div>

            <Paper
              key={image.id}
              withBorder
              radius="sm">
              <div style={{ position: "relative" }}>
                <Image
                  src={image.preview || "/placeholder.svg"}
                  alt="Preview"
                  height={100}
                  fit="cover"
                  fallbackSrc="/placeholder.svg?height=100&width=150"
                />
                <ActionIcon
                  color="red"
                  size="xs"
                  radius="xl"
                  variant="filled"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                  onClick={() => removeImage(image.id)}
                >
                  <IconX size={12} />
                </ActionIcon>
              </div>
              <Group justify="space-between" p="xs">
                <Text size="xs" truncate style={{ flex: 1 }}>
                  {image.file.name}
                </Text>
                <Badge size="xs" variant="light">
                  {formatFileSize(image.file.size)}
                </Badge>
              </Group>
            </Paper>


          </div>
        )}
      </div>

      {/* Previous Image */}
      {cover_image_url &&
        <div className='flex flex-col items-start justify-start'>
          <label
            htmlFor="previous_blog_image"
            className='font-semibold'>Previous Blog Image</label>

          {
            cover_image_url ?
              <div className='w-full h-[255px] overflow-hidden rounded-sm'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/blog/image/${cover_image_url.id}`}
                  alt="Preview"
                  height={100}
                  fit="cover"
                  className='w-full h-full object-cover'
                  fallbackSrc="/placeholder.svg?height=100&width=150"
                />
              </div> :
              <div className="flex pt-5">
                <h1>No Previous Image</h1>
              </div>
          }
        </div>}
    </div>
  )
}
