"use client";
import React, { Dispatch, SetStateAction } from 'react'

import { Button, Text, } from '@mantine/core';

// Icons
import { MdArrowBackIos } from 'react-icons/md';


interface ISignIn {
  setStep: Dispatch<SetStateAction<string>>;
}

export default function VerifyEmail({ setStep }: ISignIn) {

  return (
    <div
      className='flex flex-col items-start justify-start w-full h-auto gap-3 p-5 mt-10 bg-white'>

      {/* Title */}
      <div
        className='relative flex justify-center w-full'>
        <div className='absolute left-0 top-2 '>
          <div
            onClick={() => {
              setStep("signin");
            }}
            className='flex items-center justify-center pl-1 rounded-full cursor-pointer bg-primary w-7 h-7'>
            <MdArrowBackIos
              className='text-white' />
          </div>
        </div>

        <div className='flex flex-col items-center justify-start w-full h-auto gap-5 px-10'>
          <Text
            size='xl'>
            Verify Account
          </Text>

          <Text
            size='sm'
            className='text-center'>
            Please verify your account by clicking the link sent to your email address.
          </Text>
        </div>
      </div>

      {/* Form */}
      <div
        className='flex flex-col items-center justify-start w-full h-auto gap-4'>
        <div
          className='flex items-center justify-center w-full mt-6'>
          <Button
            onClick={() => window.open('https://mail.google.com', '_blank')}>
            <span
              className='flex flex-row items-center justify-center w-full gap-2'>
              Verify
            </span>
          </Button>
        </div>

      </div>
    </div>
  )
}