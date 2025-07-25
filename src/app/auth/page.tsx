"use client";

import React, { useState } from 'react'

// Comnponents
import SignIn from './components/SignIn';
import SignInwithEmail from './components/SignInwithEmail';
import SignUpwithEmail from './components/SignUpwithEmail';
import VerifyEmail from './components/VerifyEmail';

export default function Auth() {
  const [step, setStep] = useState<string>("signin");

  return (
    <div
      style={{
        backgroundImage: "url('/auth-background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className='relative w-full h-full min-h-[calc(100vh-10rem)] px-4 md:px-0'>

      {/* Background Overlay */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}>
      </div>

      {/* Main Contents */}
      <div
        className='relative z-10 w-full md:w-[29rem] h-auto mx-auto container flex flex-row items-center justify-between'>
        {
          step == "signin" ?
            <SignIn setStep={setStep} /> :
            step == "sign-in-with-email" ?
              <SignInwithEmail setStep={setStep} /> :
              step == "sign-up-with-email" ?
                <SignUpwithEmail setStep={setStep} /> :
                step == "verify-email" ?
                  <VerifyEmail setStep={setStep} /> : null

        }
      </div>
    </div>
  )
}
