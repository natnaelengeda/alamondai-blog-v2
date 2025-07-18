"use client";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

// Components
import { Avatar } from '@mantine/core';
import { Menu } from '@mantine/core';

// Redux;
import { useDispatch, useSelector } from 'react-redux'
import { addInfo, logout, UserState } from '@/state/user'

// Firebase
import { getAuth, signOut } from "firebase/auth";

// Utils
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';

// Toast
import toast from 'react-hot-toast';


export default function ProfileCircle() {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [initials, setInitials] = useState<string>("");
  const [avatarColor, setAvatarColor] = useState<string>("blue");

  const LogoutFunction = async () => {
    try {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          dispatch(logout());
        }).catch((error) => {
          toast.error("Unable to logout, please try again later.");
        });


    } catch (error) {

    }
  }

  useEffect(() => {
    const init = initialExtract(user.name);
    const avatColor = lettersToHexColor(init);

    setInitials(init);
    setAvatarColor(avatColor);
  }, []);

  return (
    <div
      style={{
        display: user.isLoggedIn ? "flex" : "none"
      }}
      className='flex items-center justify-end w-20'>
      <Menu
        shadow="md"
        width={200}
        position='bottom'>
        <Menu.Target>
          {
            user.avatarUrl ?
              <Avatar
                radius="xl"
                src={user.avatarUrl}
                color={avatarColor}
                size={50}
                className='cursor-pointer'>
                {initials}
              </Avatar> :
              <Avatar
                radius="xl"
                color={avatarColor}
                size={50}
                className='cursor-pointer'>
                {initials}
              </Avatar>
          }
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <div className='flex flex-row items-center justify-start w-full h-auto gap-2'>
              {
                user.avatarUrl ?
                  <Avatar
                    radius="xl"
                    src={user.avatarUrl}
                    color={avatarColor}
                    size={50}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar> :
                  <Avatar
                    radius="xl"
                    color={avatarColor}
                    size={50}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar>
              }
              <div className='flex flex-col items-start justify-start w-full'>
                <p>{user.name}</p>
                <p className='text-xs'>@{user.username}</p>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push("/blog/write")}>
            Write
          </Menu.Item>
          <Menu.Item
            onClick={() => router.push("/profile")}>
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
