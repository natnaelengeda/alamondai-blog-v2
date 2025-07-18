"use client";
import React, { useState } from 'react'

// Components
import Sidebar from './sidebar';
import Profile from './profile';
import Posts from './posts';
import Messaging from './messaging';

export default function Main() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[calc(100vh-10rem)] bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab} />

      {
        activeTab === "profile" ? (
          <Profile />) :
          activeTab === "posts" ? (
            <Posts />
          ) : activeTab == "messaging" ? (
            <Messaging />
          ) : null
      }

    </div>
  )
}
