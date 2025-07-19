"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@mantine/core"

// ApAsset
import AppAsset from "@/core/AppAsset"

import { IconArrowLeft, IconHome, IconSearch } from "@tabler/icons-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
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
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">Page Not Found</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The article might have been moved, deleted, or the URL
            might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Link href="/">
              <IconHome className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button variant="outline" size="lg">
            <Link href="/search">
              <IconSearch className="w-4 h-4 mr-2" />
              Search Articles
            </Link>
          </Button>

          <Button variant="ghost" size="lg">
            <Link href="javascript:history.back()">
              <IconArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Looking for something specific? Try these popular sections:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className="px-3 py-1 text-sm bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Latest Posts
            </Link>
            <Link
              href="/categories"
              className="px-3 py-1 text-sm bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="px-3 py-1 text-sm bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-1 text-sm bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
