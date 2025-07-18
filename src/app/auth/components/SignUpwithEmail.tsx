"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';

// Firebase
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { showLoginError } from '@/lib/ui';

// State
import { useDispatch } from 'react-redux';
import { addId, addInfo, login } from '@/state/user';

// Toast
import { toast } from "react-hot-toast";

// Utils
import axios from "@/utils/axios";

// Icons
import { MdArrowBackIos } from 'react-icons/md';

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
      setIsLoading(true);

      axios.post("/user", {
        fullName: value.fullName,
        email: value.email.toLocaleLowerCase().trim(),
        username: value.username.toLocaleLowerCase().trim(),
        isVerified: false
      }).then(async (response) => {
        const status = response.status;
        const msg = response.data.msg;
        const userId = response.data.userId;

        if (status == 200) {
          const data = response.data;

          const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
          if (userCredential && userCredential.user) {
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            localStorage.setItem("accessToken", idToken);

            // User creation was successful
            toast.success("Account created successfully! Please verify your email.");
            await sendEmailVerification(userCredential.user);
            dispatch(login({
              isLoggedIn: true
            }));

            dispatch(addInfo({
              name: value.fullName,
              email: value.email,
              username: value.username,
              avatarUrl: "",
            }));

            dispatch(addId({
              id: userId
            }))

            setStep("verify-email");
          } else {
            toast.error("Failed to create account. Please try again.");
          }
        }

        if (status == 201) {
          if (msg == "email_in_use") {
            return toast.error("Email Already Registered");
          }

          if (msg == "username_in_use") {
            return toast.error("Username Already Taken");
          }
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 400) {
          toast.error("Unable to Send OTP, Try Again Later");
        };
      }).finally(() => {
        setIsLoading(false);
      })

    } catch (error) {
      showLoginError(error);
    }
  }

  return (
    <div
      className='flex flex-col items-start justify-start w-full h-auto p-5 mt-10 bg-white gap-7'>

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
          Sign Up with Email
        </Text>
      </div>

      {/* Form */}
      <form
        onSubmit={form.onSubmit(sumbitFunction)}
        className='flex flex-col items-start justify-start w-full h-auto gap-4'>
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
          className='flex items-center justify-end w-full mt-6'>
          {/* <span>Don't have an account? <span
            className='underline cursor-pointer text-primary'
            onClick={() => setStep("sign-up-with-email")}> Sign up</span>
          </span> */}
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
                  <>Sign Up</>
              }
            </span>
          </Button>
        </div>

      </form>
    </div>
  )
}
