import React from 'react'

import Image from 'next/image'
import { Button, Text } from '@mantine/core'

import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

// App Asset
import AppAsset from '@/core/AppAsset'

// Icons
import { MdOutlineMail } from "react-icons/md";
import Link from 'next/link';

export default function SignUp() {
  return (
    <div
      className='w-full h-full flex flex-col items-start justify-start  gap-7'>

      {/* Title */}
      <div className='w-full flex justify-center'>
        <Text
          size='xl'>
          Get Started
        </Text>
      </div>

      {/* Options */}
      <div className='w-80 mx-auto  flex flex-col items-center justify-center gap-4'>

        {/* Google */}
        <Button
          variant="outline"
          radius={"xl"}
          style={{
            width: "100%"
          }}>
          <span className='flex items-center gap-2'>
            <Image
              src={AppAsset.GoogleIcon}
              alt='Google Auth'
              className='w-5 h-5 object-contain' />
            Sign Up with Google
          </span>
        </Button>

        {/* X */}
        <Button
          variant="outline"
          radius={"xl"}
          style={{
            width: "100%"
          }}>
          <span className='flex items-center gap-2'>
            <Image
              src={AppAsset.XIcon}
              alt='Google Auth'
              className='w-5 h-5 object-contain' />
            Sign Up with X
          </span>
        </Button>

        {/* Email */}
        <Button
          variant="outline"
          radius={"xl"}
          style={{
            width: "100%"
          }}>
          <span className='flex items-center gap-2'>
            <MdOutlineMail className='w-6 h-6' />
            Sign Up with Email
          </span>
        </Button>
      </div>

      {/* Aggreement */}
      <div className='px-10 pt-10'>
        <p className='text-sm text-gray-400 text-center'>Click “Sign Up” to agree to Alamongai {`Blog's`} Terms of Service and acknowledge that Alamongai {`Blog's`} <Link href={"/privacy-policy"} className='underline hover:text-black'>Privacy Policy</Link> applies to you.</p>
      </div>
    </div>
  )
}
