"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import { addInfo, login } from '@/state/user';

// Axios
import axios from "@/utils/axios";

// JWT
import { jwtDecode } from "jwt-decode";

// Toast
import toast from 'react-hot-toast';

// Icons
import { MdArrowBackIos } from 'react-icons/md';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type JwtPayload = {
  id: string;
  role: "user" | string; // If role can only be "user", use just "user"
  exp: number;
  iat: number;
};

type IUser = {
  email: string;
  name: string;
  username: string;
  profileImage: string;
};

interface ISignIn {
  setStep: Dispatch<SetStateAction<string>>;
}

export default function SignInwithEmail({ setStep }: ISignIn) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: ""
    },

    validate: {
      email: (value) => (
        /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => {
        if (value.length < 8) return "At least 8 characters";

        return null;
      }
    }
  });

  const sumbitFunction = (value: any) => {
    setIsLoading(true);
    try {
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Get the ID token
          const idToken = await user.getIdToken();

          dispatch(login({
            isLoggedIn: true
          }));

          console.log('ID Token:', idToken);
          axios.post("/user/login", {
            email: value.email,
            token: idToken
          }).then((response) => {
            const status = response.status;
            if (status == 200) {
              const data: IUser = response.data;

              dispatch(addInfo({
                name: data.name,
                email: value.email,
                username: data.username,
                avatarUrl: data.profileImage
              }));

              router.push("/");
              toast.success("Login Success");
            }
          }).catch((error) => {
            const status = error.response.status;
            if (status == 404) {
              toast.error("User Not Found, Signup Again");
            } else {
              toast.error("Internal Server Error");
            }
          })

        })
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case 'auth/invalid-email':
              toast.error("Invalid email address.");
              break
            case 'auth/user-disabled':
              toast.error("This user account has been disabled.");
              break
            case 'auth/user-not-found':
              toast.error("No account found with this email.");
              break
            case 'auth/wrong-password':
              toast.error("Incorrect Email or Password");
              break
            case 'auth/invalid-credential':
              toast.error("Incorrect Email or Password");
              break;
            default:
              toast.error("An error occurred. Please try again later.");
          }
        }).finally(() => {
          setIsLoading(false);
        });
    } catch (error) {

    }
  }

  return (
    <div
      className='w-full h-full bg-white flex flex-col items-start justify-start gap-7 p-5 pb-16 mt-16'>

      {/* Title */}
      <div
        className='relative w-full flex justify-center'>
        <div className='absolute top-2 left-0 '>
          <div
            onClick={() => {
              setStep("signin");
            }}
            className='bg-primary w-7 h-7 rounded-full flex items-center justify-center pl-1 cursor-pointer'>
            <MdArrowBackIos
              className='text-white' />
          </div>
        </div>

        <Text
          size='xl'>
          Sign In with Email
        </Text>
      </div>

      {/* Form */}
      <form
        onSubmit={form.onSubmit(sumbitFunction)}
        className='w-full h-auto flex flex-col items-start justify-start gap-4'>
        <TextInput
          className='w-full'
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')} />

        <PasswordInput
          className='w-full'
          withAsterisk
          label="Password"
          placeholder="********"
          key={form.key('password')}
          {...form.getInputProps('password')} />

        <div
          className='w-full mt-6 flex items-center justify-between'>
          <span>Don't have an account? <span
            className='text-primary underline cursor-pointer'
            onClick={() => setStep("sign-up-with-email")}> Sign up</span>
          </span>
          <Button
            type="submit"
            disabled={isLoading}>
            <span
              className='w-full flex flex-row items-center justify-center gap-2'>
              {
                isLoading ?
                  <><Loader
                    color="white"
                    size="xs" /> Loading</> :
                  <>Login</>
              }
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}
