"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Text } from '@mantine/core';
import ReactLoading from "react-loading";

// Axios
import axios from "@/utils/axios";
import toast from 'react-hot-toast';

export default function Sign() {
  const [message, setMessage] = useState("You are ")
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const verifyUser = () => {
    try {
      axios.get(`/user/verify/${id}`)
        .then((response) => {
          const status = response.status;
          if (status == 200) {
            toast.success("Your account is verified");
            setMessage("Your account is verified");
          }

          if (status == 301) {
            toast.error("User Not Found, Please Signup");
            setMessage("User Not Found, Please Signup");
          }
        }).catch((error) => {
          toast.error("Unable to verify Account");
          setMessage("Unable to verify Account")
        }).finally(() => {
          setIsLoading(false);
        })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    verifyUser();
  }, [id]);

  return (
    <div
      style={{
        backgroundImage: "url('/auth-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className='relative w-full h-full min-h-[calc(100vh-10rem)] px-4 md:px-0'>

      {/* Background Overlay */}
      <div
        className='w-full h-full absolute top-0 left-0'
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}>
      </div>

      {/* Main Contents */}
      <div
        className='relative z-10 w-full md:w-[29rem] h-auto mx-auto container flex flex-row items-center justify-between'>
        <div
          className='w-full h-auto bg-white flex flex-col items-start justify-start gap-7 p-5 mt-10 '>
          <div
            className='w-full flex items-center justify-center'>
            <Text
              size='xl'>
              Verifiying...
            </Text>
          </div>


          <div
            className='w-full h-full flex flex-row items-center justify-center '>
            {
              isLoading ?
                <ReactLoading type="spinningBubbles" color="#3989B3" /> :
                <p className='text-lg font-bold'>{message}</p>
            }
          </div>
          <div className='h-s3'>

          </div>
        </div>

      </div>
    </div>
  )
}
