import React from 'react'

import Image from 'next/image'
import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
import ProfileCircle from './profile-circle'

// Redux;
import { useSelector } from 'react-redux'
import { UserState } from '@/state/user'

// App Asset
import AppAsset from '@/core/AppAsset'

export default function Header() {
  const router = useRouter();
  const user = useSelector((state: { user: UserState }) => state.user);

  const width = window.innerWidth;

  return (
    <header
      className='w-full h-20 border-b border-gray-200 px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto bg-white z-50'>
      {/* Main Content */}
      <div className='container flex flex-row items-center justify-between w-full h-full mx-auto'>

        {/* Header */}
        <div
          onClick={() => {
            router.push("/");
          }}
          className='flex flex-row items-center justify-start gap-2 cursor-pointer'>
          <Image
            src={AppAsset.logo}
            alt="Logo"
            className='w-12 h-12' />
          <p className="font-serif text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            Blog
          </p>
        </div>

        {/* Login / Get Started */}
        <div
          style={{
            display: user.isLoggedIn ? "none" : "flex"
          }}
          className='flex items-center justify-between gap-2'>
          <Button
            style={{
              display: width < 768 ? "none" : "flex"
            }}
            variant='transparent'
            onClick={() => {
              router.push("/auth")
            }}>
            Sign in
          </Button>

          <Button
            // variant="outline"
            radius="xl"
            onClick={() => {
              router.push("/auth")
            }}>
            Get Started
          </Button>
        </div>

        {/* Profile Image */}
        <ProfileCircle />
      </div>
    </header>
  )
}
