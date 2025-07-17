import React from 'react'
import Image from 'next/image'

import AppAsset from '@/core/AppAsset'
import { Button, TextInput } from '@mantine/core'

import toast from 'react-hot-toast'

// Icons
import { IconArrowRight } from '@tabler/icons-react'
import { CiClock1, CiUser } from 'react-icons/ci'
import { emailSubscription } from '@/api/blog'

export default function NewsLetter() {
  const [email, setEmail] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }
    setIsSubmitting(true);

    try {
      const result = await emailSubscription(email);
      const status = result.status;

      if (status == 200) {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsSubmitting(false);
      }


    } catch (error: any) {
      const status = error.response?.status;
      if (status == 400) {
        setIsSubmitting(false);
        toast.error("You are already subscribed to the newsletter.");
      } else {
        setIsSubmitting(false);
        toast.error("Failed to subscribe. Please try again.");
      }
    }

  };

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center gap-5'>
      <div className='w-full h-full md:h-96 flex flex-col md:flex-row items-start justify-start relative gap-10'>
        <Image
          src={AppAsset.NewsLetterhero}
          className='w-full md:w-3/5 xl:w-2/3 h-96 object-cover border border-gray-300'
          alt="NewsLetter Hero" />

        <div className='w-full h-full flex flex-col items-start justify-start gap-5'>
          {/* Alamondai Name */}
          <div
            className='w-full flex flex-row items-center justify-start'>
            <div className='w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden'>
              <Image
                src={AppAsset.logo}
                className='w-auto object-cover rounded-full'
                alt='Alamondai Logo' />
            </div>
            <h1
              className='text-xl font-bold ml-5'>Alamonadi Blog</h1>
          </div>

          {/* Text */}
          <div>
            <h1>The official source of news and updates about Alamondai & Tech</h1>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full space-y-4">
            <div className="w-full flex flex-col sm:flex-row gap-3 pt-10">
              <TextInput
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1" />

              <Button
                color='#3989B3'
                type="submit"
                className="sm:w-auto"
                disabled={isSubmitting}
                loading={isSubmitting}>
                Subscribe
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CiClock1 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-sm">Weekly Updates</h3>
              <p className="text-xs text-gray-500">Every Tuesday</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <IconArrowRight className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-sm">Exclusive Content</h3>
              <p className="text-xs text-gray-500">Subscriber only</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CiUser className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-sm">No Spam</h3>
              <p className="text-xs text-gray-500">Unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
