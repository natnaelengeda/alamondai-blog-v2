"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

// Mantine
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Avatar, Button, Textarea, TextInput } from '@mantine/core';

// Components
import ProfilePageSkeleton from './profile-page-skeleton';
import UpdateProfilePictureModal from './update-profile-picture';

// Api
import { fetchUserProfile, updateUserProfile } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

// Toast
import toast from 'react-hot-toast';

// Utils
import { initialExtract } from '@/utils/initialExtract';
import { lettersToHexColor } from '@/utils/lettersToHexColor';
import { IconCameraBitcoin } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImage, UserState } from '@/state/user';

export default function Profile() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [avatarColor, setAvatarColor] = useState<string>("blue");
  const [initials, setInitials] = useState<string>("");
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: fetchUserProfile,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes fresh
  });

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      bio: "",
      twitterUsername: "",
      mobileNumber: "",
      createdAt: "",
    },

    validate: {
      fullName: (value) => (value.length < 2 ? 'Full Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobileNumber: (value) => value == "" ? null : (/^\+?[0-9]{8,15}$/.test(value) ? null : 'Invalid mobile number'),
      bio: (value) => (value.length > 500 ? 'Bio must be less than 500 characters' : null),
      username: (value) => (value.length < 3 ? 'Username must have at least 3 characters' : null),
    }
  })

  const initialValuesRef = useRef<any>(form.values);

  const handleSave = (value: any) => {
    const hasChanged = Object.entries(value).some(
      ([key, val]) => val !== initialValuesRef.current[key as keyof typeof value]
    );

    if (!hasChanged) {
      toast("No changes to save.");
      return;
    }

    setLoading(true);
    updateUserProfile(value)
      .then((response) => {
        console.log(response)
        const user = response.user;
        form.setValues({
          fullName: user.fullName,
          bio: user.bio,
          twitterUsername: user.twitterUsername,
          mobileNumber: user.mobileNumber,
        });
        initialValuesRef.current = { ...form.values };
        toast.success("Profile updated successfully!");
      }).catch((error) => {
        toast.error("Failed to update profile. Please try again later.");
      }).finally(() => {
        setLoading(false);
      })
  }

  const handleCancel = () => {
    router.push("/");
  }

  useEffect(() => {
    if (data) {
      const init = initialExtract(data.fullName);
      const avatColor = lettersToHexColor(init);
      setInitials(init);
      setAvatarColor(avatColor);

      const initialValues = {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        bio: data.bio,
        twitterUsername: data.twitterUsername,
        mobileNumber: data.mobileNumber,
        createdAt: data.createdAt
      };

      form.setValues(initialValues);
      initialValuesRef.current = initialValues;

      // Check Latest Image
      const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/image/${data.image.id}`
      if (user.avatarUrl !== imageUrl) {
        dispatch(updateProfileImage({ avatarUrl: imageUrl }));
      }

    }
  }, [data]);

  if (isPending) {
    return (
      <ProfilePageSkeleton />
    );
  }


  return (
    <form
      onSubmit={form.onSubmit(handleSave)}
      className="flex flex-col flex-1">
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type='submit'
              loading={loading}
              disabled={loading}
              className="bg-primary hover:bg-blue-700">
              Save
            </Button>
          </div>
        </div>
      </div>
      <div

        className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Section */}
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div
              className="relative items-center justify-center flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-200 rounded-full">
              {
                (user.avatarUrl) ? (
                  <Avatar
                    radius="xl"
                    src={user.avatarUrl}
                    color={avatarColor}
                    size={100}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar>
                ) : (
                  <Avatar
                    radius="xl"
                    color={avatarColor}
                    size={100}
                    className='cursor-pointer'>
                    {initials}
                  </Avatar>
                )
              }
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5);' /* black with 50% opacity */
                }}
                className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
                <div
                  onClick={open}
                  className='flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer hover:bg-gray-200'>
                  <IconCameraBitcoin />
                </div>
              </div>

            </div>

            {/* Profile Form */}
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                <TextInput
                  className="w-full"
                  key={form.key('fullName')}
                  {...form.getInputProps('fullName')}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <TextInput
                  type="email"
                  className="w-full"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">Managed by authentication</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">X (Twitter) Username</label>
                <div className="relative">
                  {/* <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">@</span> */}
                  <TextInput
                    className="w-full"
                    key={form.key('twitterUsername')}
                    {...form.getInputProps('twitterUsername')}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                <TextInput
                  type="username"
                  className="w-full"
                  key={form.key('username')}
                  {...form.getInputProps('username')}
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">Can't be changed</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                <TextInput
                  className="w-full"
                  key={form.key('mobileNumber')}
                  {...form.getInputProps('mobileNumber')}
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
            <Textarea
              placeholder="Share public info like bio, insta id, or a way to contact you"
              className="w-full h-24 resize-none"
              key={form.key('bio')}
              {...form.getInputProps('bio')}
            />
            <p className="mt-2 text-xs text-gray-500">
              This account was created on {new Date(data.createdAt).toLocaleDateString()}.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Your bio is public. Email & mobile are private, accessible only to you.
            </p>
          </div>
        </div>
      </div>
      <UpdateProfilePictureModal
        opened={opened}
        close={close}
        profileImage={data.image}
        initials={initials}
        avatarColor={avatarColor} />
    </form>
  )
}
