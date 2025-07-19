"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@mantine/core"

// ApAsset
import AppAsset from "@/core/AppAsset"

import { IconArrowLeft, IconHome, IconSearch } from "@tabler/icons-react"

export default function Page() {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={AppAsset.logo}
            alt="Blog Logo"
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32" />
        </div>

        {/* 404 Text */}
        <div className="space-y-4 px-5">
          <h1 className="text-8xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text">
            404
          </h1>
          <h2 className="text-2xl md:text-2xl font-semibold text-slate-800">Page Not Found</h2>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The article might have been moved, deleted, or the URL
            might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Link
              href="/"
              className="flex flex-row items-center justify-center">
              <IconHome className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button variant="outline" size="lg">
            <Link
              href="/search"
              className="flex flex-row items-center justify-center">
              <IconSearch className="w-4 h-4 mr-2" />
              Search Articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
