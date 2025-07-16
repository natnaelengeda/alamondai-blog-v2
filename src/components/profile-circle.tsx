"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

// Components
import { Avatar } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';

// Redux;
import { useDispatch, useSelector } from 'react-redux'
import { addInfo, logout, UserState } from '@/state/user'

// Utils
import axios from "@/utils/axios";
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';

type UserInfo = {
  avatarUrl: string | null;
  bio: string | null;
  email: string;
  isVerified: boolean;
  name: string;
  role: "user" | string;
  username: string;
};

export default function ProfileCircle() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [initials, setInitials] = useState<string>("");
  const [avatarColor, setAvatarColor] = useState<string>("blue");


  const LogoutFunction = async () => {
    try {
      axios.delete(`/user/logout`)
        .finally(() => {
          dispatch(logout());
          router.push("/")
        })
    } catch (error) {

    }
  }

  const getuserProfile = async () => {
    try {
      if (user.isLoggedIn) {
        // axios.get(`/user/profile/${user.id}`)
        //   .then((response) => {
        //     const status = response.status;
        //     if (status == 200) {
        //       const data: UserInfo = response.data;
        //       // dispatch(addInfo(data));
        //       const init = initialExtract(data.name);
        //       const avatColor = lettersToHexColor(init);

        //       setInitials(init);
        //       setAvatarColor(avatColor);
        //     }
        //   }).catch((error) => {
        //     console.log(error)
        //   })
      }
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   // getuserProfile();
  // }, [user.isLoggedIn]);

  return (
    <div
      style={{
        display: user.isLoggedIn ? "flex" : "none"
      }}
      className='w-20 flex items-center justify-end'>
      <Menu
        shadow="md"
        width={200}
        position='bottom'>
        <Menu.Target>
          <Avatar
            radius="xl"
            color={avatarColor}
            size={50}
            className='cursor-pointer'>
            {initials}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <div className='w-full h-auto flex flex-row items-center justify-start gap-2'>
              <Avatar
                radius="xl"
                color={avatarColor}
                size={50}
                className='cursor-pointer'>
                {initials}
              </Avatar>
              <div className='w-full flex flex-col items-start justify-start'>
                <p>{user.name}</p>
                <p className='text-xs'>@{user.username}</p>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push("/blog/write")}>
            Write
          </Menu.Item>
          <Menu.Item>
            Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            onClick={LogoutFunction}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

    </div>
  )
}
