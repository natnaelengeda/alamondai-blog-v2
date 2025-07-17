"use client";
import React, { useState } from 'react'

import { Button, } from '@mantine/core';

// Components
import Sidebar from './sidebar';
import Profile from './profile';

export default function Main() {
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    fullName: "Natnael Engeda",
    email: "natlynengeeda@gmail.com",
    twitterUsername: "natnaelengeda",
    mobileNumber: "251936657001",
    bio: "",
    metroCardNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving profile data:", formData)
  }

  const handleCancel = () => {
    console.log("Cancelling changes")
  }

  return (
    <div className="flex w-full h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar />


      {
        activeTab === "profile" && (
          <Profile />)
      }


    </div>
  )
}
