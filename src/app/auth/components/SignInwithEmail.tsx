"use client";

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import { addId, addInfo, login } from '@/state/user';

// Axios
import axios from "@/utils/axios";


// Toast
import toast from 'react-hot-toast';

// Icons
import { MdArrowBackIos } from 'react-icons/md';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';


type IUser = {
  id: number;
  email: string;
  name: string;
  username: string;
  profileImage: string;
};

interface ISignIn {
  setStep: any;
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

          dispatch(login({
            isLoggedIn: true
          }));

          router.push("/");
          toast.success("Login Success");

          axios.post("/user/login", {
            email: value.email,
          }).then((response) => {
            const status = response.status;
            if (status == 200) {
              const data: IUser = response.data;

              dispatch(addId({
                id: data.id,
              }));

              dispatch(addInfo({
                name: data.name,
                email: value.email,
                username: data.username,
                avatarUrl: data.profileImage
              }));


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
      className='flex flex-col items-start justify-start w-full h-full p-5 pb-16 mt-16 bg-white gap-7'>

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

        <Text
          size='xl'>
          Sign In with Email
        </Text>
      </div>

      {/* Form */}
      <form
        onSubmit={form.onSubmit(sumbitFunction)}
        className='flex flex-col items-start justify-start w-full h-auto gap-4'>
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
          className='flex items-center justify-between w-full mt-6'>
          <span>{`Don't have an account? `}<span
            className='underline cursor-pointer text-primary'
            onClick={() => setStep("sign-up-with-email")}> Sign up</span>
          </span>
          <Button
            type="submit"
            disabled={isLoading}>
            <span
              className='flex flex-row items-center justify-center w-full gap-2'>
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
