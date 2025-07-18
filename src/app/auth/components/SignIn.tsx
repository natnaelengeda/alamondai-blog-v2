"use client";

import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button, Text } from '@mantine/core'
import { useRouter } from 'next/navigation';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import axios from "@/utils/axios";
import AppAsset from '@/core/AppAsset';

// Icons
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { login } from '@/state/user';

interface ISignIn {
  setStep: Dispatch<SetStateAction<string>>;
}

export default function SignIn({ setStep }: ISignIn) {
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const idToken = await user.getIdToken();

    const uid = user.uid;
    const name = user.displayName;
    const email = user.email;
    const photoUrl = user.photoURL;

    dispatch(login({
      isLoggedIn: true,
    }));

    router.push("/");
    axios.post("/user/google-auth", {
      uid: uid,
      name: name,
      email: email,
      photoUrl: photoUrl,
    }).then(() => {

    });

  }

  return (
    <div
      className='w-full h-full bg-white flex flex-col items-start justify-start gap-7 mt-14 p-5 pb-16'>

      {/* Title */}
      <div className='w-full flex justify-center'>
        <Text
          size='xl'>
          Welcome Back
        </Text>
      </div>

      {/* Options */}
      <div className='w-80 mx-auto  flex flex-col items-center justify-center gap-4'>

        {/* Google */}
        <Button
          onClick={GoogleSignIn}
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
            Sign in with Google
          </span>
        </Button>

        {/* Email */}
        <Button
          onClick={() => setStep("sign-in-with-email")}
          variant="outline"
          radius={"xl"}
          style={{
            width: "100%"
          }}>
          <span className='flex items-center gap-2'>
            <MdOutlineMail className='w-6 h-6' />
            Sign in with Email
          </span>
        </Button>

      </div>

      {/* Aggreement */}
      <div className='px-10 pt-10'>
        <p className='text-sm text-gray-400 text-center'>Click “Sign In” to agree to Alamongai {`Blog's`} Terms of Service and acknowledge that Alamongai {`Blog's`} <Link href={"/privacy-policy"} className='underline hover:text-black'>Privacy Policy</Link> applies to you.</p>
      </div>
    </div>
  )
}
