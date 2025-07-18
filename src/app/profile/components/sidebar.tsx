import React from 'react'

// Firebase
import { getAuth, signOut } from "firebase/auth";

// Hooks
import { useLogout } from '@/lib/useLogout';

// toast
import toast from 'react-hot-toast';

// Icons
import { IoMdLogOut } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { CiCreditCard1, CiSettings, CiUser } from 'react-icons/ci';

export default function Sidebar({ setActiveTab, activeTab }: any) {
  const logout = useLogout();

  const LogoutFunction = async () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        logout();
      }).catch((error) => {
        toast.error("Unable to logout, please try again later.");
      });
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <CiUser className="w-5 h-5" />,
      hidden: false,
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: <CiCreditCard1 className="w-5 h-5" />,
      hidden: false,
    },
    {
      id: 'messaging',
      label: 'Messaging',
      icon: <MdMessage className="w-5 h-5" />,
      hidden: false,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <CiSettings className="w-5 h-5" />,
      hidden: true,
    },
  ];

  return (
    <div className="flex flex-col w-full md:w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <FaUserCircle className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Profile</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2 flex flex-row md:flex-col">
          {tabs.map(tab => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={tab.hidden ? 'hidden' : 'cursor-pointer'}>
              <a
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                {tab.icon}
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="hidden md:flex p-4 border-t border-gray-200">

        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <span>Alamondai Blog</span>
          <span>v1.0.0</span>
        </div>

        <button
          onClick={LogoutFunction}
          className="w-full h-10 flex items-center gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded px-3 cursor-pointer">
          <IoMdLogOut
            className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
