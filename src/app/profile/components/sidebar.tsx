import React from 'react'

// Icons
import { IoMdLogOut } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { IconPackage } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { FaUserCircle } from 'react-icons/fa';
import { CiCreditCard1, CiLink, CiSearch, CiSettings, CiUser } from 'react-icons/ci';


export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
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
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-blue-600 rounded-lg bg-blue-50">
              <CiUser className="w-5 h-5" />
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <CiCreditCard1 className="w-5 h-5" />
              Posts
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <MdMessage className="w-5 h-5" />
              Messaging
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50">
              <CiSettings className="w-5 h-5" />
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">

        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <span>Alamondai Blog</span>
          <span>v1.0.0</span>
        </div>

        <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600">
          <IoMdLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
