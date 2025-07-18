import React, { useState } from 'react'

// Mantine
import { Button, Modal } from '@mantine/core';

// Api
import { useQueryClient } from '@tanstack/react-query';
import { deleteBlogById } from '@/api/blog';

// Toast
import toast from 'react-hot-toast';

interface IDeleteBlogModal {
  deleteBlog: { id: number, title: string }
  opened: any;
  close: any;
}

export default function DeleteBlogModal({ opened, close, deleteBlog }: IDeleteBlogModal) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    deleteBlogById({ id: deleteBlog.id })
      .then((response) => {
        const status = response.status;
        if (status == 200) {
          toast.success("Blog Deleted Successfully");
          close();
          queryClient.refetchQueries({ queryKey: ['current-user-blog'] })
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 404) {
          toast.error("Blog Not Found");
        } else if (status == 403) {
          toast.error("You are not allowed to delete this blog");
        } else {
          toast.error("Internal Server Error");
        }
      }).finally(() => {
        setIsLoading(false);
      })
  }
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Delete Blog"
      centered>
      <div className='w-full h-full flex flex-col items-start justify-start gap-4'>
        <h1>Are you sure you want to delete this blog: {deleteBlog.title}</h1>
        <div className='flex flex-row items-center justify-start gap-4'>
          <Button
            color="red"
            onClick={onDelete}
            loading={isLoading}
            disabled={isLoading}>
            Delete
          </Button>
          <Button
            onClick={close}>
            Cancel
          </Button>

        </div>

      </div>

    </Modal>
  )
}
