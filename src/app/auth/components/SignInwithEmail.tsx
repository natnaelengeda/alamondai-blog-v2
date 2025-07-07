"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import { login } from '@/state/user';

// Axios
import axios from "@/utils/axios";

// JWT
import { jwtDecode } from "jwt-decode";

// Toast
import toast from 'react-hot-toast';

// Icons
import { MdArrowBackIos } from 'react-icons/md';

type JwtPayload = {
  id: string;
  role: "user" | string; // If role can only be "user", use just "user"
  exp: number;
  iat: number;
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
    axios.post("/user/login", {
      email: value.email,
      password: value.password
    }).then((response) => {
      const status = response.status;
      if (status == 200) {
        const data = response.data;
        const decoded: JwtPayload = jwtDecode(data.accessToken);
        dispatch(login({
          id: decoded.id,
          role: decoded.role,
          token: data.accessToken,
          isLoggedIn: true,
        }));
        router.push("/");
        toast.success("Login Success");

      }
      if (status == 201) {
        toast.error("User Not Found");
        setIsLoading(false);
      }
      console.log(response);
    }).catch((error) => {
      console.error(error);
      const status = error.response.status;
      if (status == 402) {
        toast.error("Invalid Email or Password");
      }

      setIsLoading(false);
    })
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
