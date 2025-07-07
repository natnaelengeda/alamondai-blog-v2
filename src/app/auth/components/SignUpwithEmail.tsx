"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';

// Firebase
import { auth, firestore } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { showLoginError } from '@/lib/ui';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

// State
import { useDispatch } from 'react-redux';

// Toast
import { toast } from "react-hot-toast";

// Utils
import axios from "@/utils/axios";

// Icons
import { MdArrowBackIos } from 'react-icons/md';
import { addTempUser } from '@/state/temp-user';

interface Input {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

interface ISignIn {
  setStep: Dispatch<SetStateAction<string>>;
}

export default function SignUpwithEmail({ setStep }: ISignIn) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userNameTaken, setUserNameTaken] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: ""
    },

    validate: {
      fullName: (value) => (/[A-Za-z]/.test(value) ? null : "No Special Characters Allowed"),
      username: (value) => {
        if (/\s/.test(value)) return "No spaces allowed";
        // if (userNameTaken == true) return "Username already Taken";
        return /[A-Za-z]/.test(value) ? null : "Only Alphabets are allowed";
      },
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => {
        if (/\s/.test(value)) return "No spaces allowed";
        if (value.length < 8) return "At least 8 characters";
        if (!/[a-z]/.test(value)) return "Must include at least one lowercase letter";
        if (!/[A-Z]/.test(value)) return "Must include at least one uppercase letter";
        if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];']/g.test(value)) return "Must include at least one special character";
        return null;
      }
    }
  });

  const sumbitFunction = async (value: Input) => {
    try {
      // setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      return user;
      // axios.post("/user/signup", {
      //   name: value.fullName,
      //   email: value.email.toLocaleLowerCase().trim(),
      //   username: value.username.toLocaleLowerCase().trim(),
      //   password: value.password
      // }).then((response) => {
      //   const status = response.status;
      //   if (status == 200) {
      //     toast.success("Verification Code has been sent to your email");
      //     dispatch(addTempUser({
      //       isOnProcess: true,
      //       email: value.email,
      //       username: value.username
      //     }));
      //     setStep("otp");
      //   }

      //   if (status == 201) {
      //     toast.error("Email Already Registered");
      //   }

      //   if (status == 202) {
      //     toast.error("Username Already Taken");
      //   }
      // }).catch((error) => {
      //   const status = error.response.status;
      //   if (status == 400) {
      //     toast.error("Unable to Send OTP, Try Again Later");
      //   };
      // }).finally(() => {
      //   setIsLoading(false);
      // })

    } catch (error) {
      showLoginError(error);
    }
  }


  return (
    <div
      className='w-full h-auto bg-white flex flex-col items-start justify-start gap-7 p-5 mt-10'>

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
          Sign Up with Email
        </Text>
      </div>

      {/* Form */}
      <form
        onSubmit={form.onSubmit(sumbitFunction)}
        className='w-full h-auto flex flex-col items-start justify-start gap-4'>
        <TextInput
          className='w-full'
          withAsterisk
          label="Full Name"
          placeholder="John Doe"
          key={form.key('fullName')}
          {...form.getInputProps('fullName')} />

        <TextInput
          className='w-full'
          withAsterisk
          label="Username"
          placeholder="@username"
          key={form.key('username')}
          {...form.getInputProps('username')} />

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
          className='w-full mt-6 flex items-center justify-end'>
          {/* <span>Don't have an account? <span
            className='text-primary underline cursor-pointer'
            onClick={() => setStep("sign-up-with-email")}> Sign up</span>
          </span> */}
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
                  <>Sign Up</>
              }
            </span>
          </Button>
        </div>

      </form>
    </div>
  )
}
