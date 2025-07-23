import React from 'react'

// Mantine
import { Button, Modal } from '@mantine/core';

// Api
import axios from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';

// Toast
import toast from 'react-hot-toast';
import { truncateText } from '@/utils/truncateText';

interface IBlogShareModal {
  id: number;
  slug: string;
  opened: boolean;
  close: () => void;
}

export default function BlogShareModal({ id, slug, opened, close }: IBlogShareModal) {
  const queryClient = useQueryClient();

  const handleShareBlog = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
      axios.post('/blog/share-blog', { blogId: id });
      queryClient.refetchQueries({ queryKey: ['blog', slug] });
      close();
    } catch (error) {
      console.error('Error sharing blog:', error);
      toast.error('Failed to copy link.');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Share Blog"
      centered>
      <div className="flex flex-col gap-4">
        <div className='w-full h-auto min-h-10 rounded flex items-center justify-between pl-3 border border-gray-300'>
          <p>{truncateText(window.location.href, 40)}</p>
          <Button
            className='flex-shrink-0'
            onClick={handleShareBlog}>
            Copy Link
          </Button>
        </div>
      </div>
    </Modal>
  )
}
