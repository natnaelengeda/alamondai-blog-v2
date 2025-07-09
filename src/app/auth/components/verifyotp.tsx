"use client";
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Text, TextInput, Loader } from '@mantine/core';
import { PinInput } from '@mantine/core';
import { jwtDecode } from 'jwt-decode';

// State
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/state/user';

// Toast
import { toast } from "react-hot-toast";

// Utils
import axios from "@/utils/axios";

// Icons
import { MdArrowBackIos } from 'react-icons/md';
import { addTempUser, TempUserState } from '@/state/temp-user';

interface Input {
  otp: string;
}

type JwtPayload = {
  id: string;
  role: "user" | string; // If role can only be "user", use just "user"
  exp: number;
  iat: number;
};

interface ISignIn {
  setStep: Dispatch<SetStateAction<string>>;
}

export default function VerifyOtp({ setStep }: ISignIn) {
  const [isLoading, setIsLoading] = useState(false);
  const tempUser = useSelector((state: { tempUser: TempUserState }) => state.tempUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: ""
    },

    validate: {
      otp: (value) => {
        if (value.length < 6) return "Fill All The Codes";
        return null;
      }
    }
  });

  const sumbitFunction = async (value: Input) => {
    try {
      setIsLoading(true);
      axios.post("/user/verify", {
        email: tempUser.email,
        otp: value.otp
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
          toast.success("Signup Success");
        }

        if (status == 201) {
          toast.error("Email Not Found");
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 402) {
          toast.error("Wrong OTP")
        } else {
          toast.error("Unknown Error Occured, Try Again Later");
        }
      }).finally(() => {
        setIsLoading(false);
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className='w-full h-auto bg-white flex flex-col items-start justify-start gap-3 p-5 mt-10'>

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

        <div className='w-full h-auto flex flex-col items-center justify-start gap-5 px-10'>
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
        className='w-full h-auto flex flex-col items-center justify-start gap-4'>
        <div
          className='w-full mt-6 flex items-center justify-center'>
          <Button
            onClick={() => window.open('https://mail.google.com', '_blank')}>
            <span
              className='w-full flex flex-row items-center justify-center gap-2'>
              Verify
            </span>
          </Button>
        </div>

      </div>
    </div>
  )
}
